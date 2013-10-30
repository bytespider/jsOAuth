
    /** @const */ var OAUTH_VERSION_1_0 = '1.0';

    /**
     * OAuth
     *
     * @constructor
     */
    function OAuth(options) {
        if (!(this instanceof OAuth)) {
            return new OAuth(options);
        }

        return this.init(options);
    }

    OAuth.prototype = {
        realm: '',
        requestTokenUrl: '',
        authorizationUrl: '',
        accessTokenUrl: '',

        init: function (options) {
            var empty = '';
            var oauth = {
                enablePrivilege: options.enablePrivilege || false,

                proxy: options.proxy,
                proxyUrl: options.proxyUrl,
                callbackUrl: options.callbackUrl || 'oob',

                consumerKey: options.consumerKey,
                consumerSecret: options.consumerSecret,
                accessTokenKey: options.accessTokenKey || empty,
                accessTokenSecret: options.accessTokenSecret || empty,
                verifier: empty,
                signatureMethod: options.signatureMethod || 'HMAC-SHA1'
            };

            this.realm = options.realm || empty;
            this.requestTokenUrl = options.requestTokenUrl || empty;
            this.authorizationUrl = options.authorizationUrl || empty;
            this.accessTokenUrl = options.accessTokenUrl || empty;

            this.getAccessToken = function () {
                return [oauth.accessTokenKey, oauth.accessTokenSecret];
            };

            this.getAccessTokenKey = function () {
                return oauth.accessTokenKey;
            };

            this.getAccessTokenSecret = function () {
                return oauth.accessTokenSecret;
            };

            this.setAccessToken = function (tokenArray, tokenSecret) {
                if (tokenSecret) {
                    tokenArray = [tokenArray, tokenSecret];
                }
                oauth.accessTokenKey = tokenArray[0];
                oauth.accessTokenSecret = tokenArray[1];
            };

            this.getVerifier = function () {
                return oauth.verifier;
            };

            this.setVerifier = function (verifier) {
                oauth.verifier = verifier;
            };

            this.setCallbackUrl = function (url) {
                oauth.callbackUrl = url;
            };

            /**
             * Makes an authenticated http request
             *
             * @param options {object}
             *      method {string} ['GET', 'POST', 'PUT', ...]
             *      url {string} A valid http(s) url
             *      data {ParamList} A list of of data. For GET this will append a query string.
             *      headers {ParamList} A list of additional headers.
             *      success {function} callback for a sucessful request
             *      failure {function} callback for a failed request
             */
            this.request = function (options) {
                var method, url, data, headers, success, failure, xhr, i,
                    headerParams, signatureMethod, signatureString, signature,
                    query = [], appendQueryString, signatureData = new ParamList(), params, withFile, urlString,
                    contentType;

                method = options.method || 'GET';
                url = URI(options.url);
                data = (options.data) ? new ParamList(options.data) : new ParamList();
                headers = (options.headers) ? new ParamList(options.headers) : new ParamList();
                success = options.success || function () {};
                failure = options.failure || function () {};

                // According to the spec
                withFile = (function(){
                    var hasFile = false;

                    data.forEach(function(param) {
                        // Thanks to the FileAPI any file entry
                        // has a fileName property
                        if (param.value instanceof File || typeof param.value.fileName !== 'undefined') {
                            hasFile = true;
                            return true;
                        }
                    });

                    return hasFile;
                })();

                appendQueryString = options.appendQueryString ? options.appendQueryString : false;

                if (oauth.enablePrivilege) {
                    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead UniversalBrowserWrite');
                }

                xhr = Request();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var regex = /^(.*?):\s*(.*?)\r?$/mg,
                            requestHeaders = headers,
                            responseHeaders = new ParamList(),
                            responseHeadersString = '',
                            match;

                        if (!!xhr.getAllResponseHeaders) {
                            responseHeadersString = xhr.getAllResponseHeaders();
                            while((match = regex.exec(responseHeadersString))) {
                                responseHeaders[match[1]] = match[2];
                            }
                        } else if (!!xhr.getResponseHeaders) {
                            responseHeadersString = xhr.getResponseHeaders();
                            for (var i = 0, len = responseHeadersString.length; i < len; ++i) {
                                responseHeaders.push(
                                    new Param(
                                        responseHeadersString[i][0],
                                        responseHeadersString[i][1]
                                    )
                                );
                            }
                        }

                        var includeXML = false;
                        var contentType = responseHeaders.getByNameInsensitive('Content-Type').getFirst();
                        if (contentType && contentType.value === 'text/xml') {
                            includeXML = true;
                        }

                        var responseObject = {
                            text: xhr.responseText,
                            xml: (includeXML ? xhr.responseXML : ''),
                            requestHeaders: requestHeaders,
                            responseHeaders: responseHeaders
                        };

                        // we are powerless against 3xx redirects
                        if((xhr.status >= 200 && xhr.status <= 226) || xhr.status == 304 || xhr.status === 0) {
                            success(responseObject);
                        // everything what is 400 and above is a failure code
                        } else if(xhr.status >= 400 && xhr.status !== 0) {
                            failure(responseObject);
                        }
                    }
                };

                headerParams = new ParamList([
                    [ 'oauth_callback', oauth.callbackUrl ],
                    [ 'oauth_consumer_key', oauth.consumerKey ],
                    [ 'oauth_token', oauth.accessTokenKey ],
                    [ 'oauth_signature_method', oauth.signatureMethod ],
                    [ 'oauth_timestamp', getTimestamp() ],
                    [ 'oauth_nonce', getNonce() ],
                    [ 'oauth_verifier', oauth.verifier ],
                    [ 'oauth_version', OAUTH_VERSION_1_0 ]
                ]);

                signatureMethod = oauth.signatureMethod;

                // Handle GET params first
                signatureData = signatureData.concat(url.query);

                // According to the OAuth spec
                // if data is transfered using
                // multipart the POST data doesn't
                // have to be signed:
                // http://www.mail-archive.com/oauth@googlegroups.com/msg01556.html
                contentType = headers.getByNameInsensitive('Content-Type').getFirst();
                if ((!contentType || contentType.value.toLowerCase() === 'application/x-www-form-urlencoded') && !withFile) {
                    signatureData = signatureData.concat(data);
                }

                urlString = url.scheme + '://' + url.host + url.path;
                signatureString = toSignatureBaseString(method, urlString, headerParams, signatureData);

                signature = OAuth.signatureMethod[signatureMethod](oauth.consumerSecret, oauth.accessTokenSecret, signatureString);

                headerParams.push(new Param('oauth_signature', signature));

                if (this.realm) {
                    headerParams.push(new Param('realm', this.realm));
                }

                if (oauth.proxy) {
                    if (typeof oauth.proxy == 'function') {
                        url = URI(oauth.proxy(url.path, url.query));
                    } else if(url.query != '') {
                        url = URI(oauth.proxy + url.path + '?' + url.query);
                    } else {
                        url = URI(oauth.proxy + url.path);
                    }
                } else if (oauth.proxyUrl) {
                    url = URI(oauth.proxyUrl + url.path);
                }

                if(appendQueryString || method === 'GET') {
                    url.query.setQueryParams(data);
                    query = null;
                } else if(!withFile){
                    // TODO: hmmmmm......  handle POST
/*                    if (typeof data === 'string') {
                        query = data;
                        if (!('Content-Type' in headers)) {
                            headers['Content-Type'] = 'text/plain';
                        }
                    } else {*/
                        query = data.copy().sort().join('&');
                        if (!contentType) {
                            headers.push(new Param('Content-Type', 'application/x-www-form-urlencoded'));
                        }
/*                    }*/

                } else if(withFile) {
                    // When using FormData multipart content type
                    // is used by default and required header
                    // is set to multipart/form-data etc
                    query = new FormData();
                    data.forEach(function(param) {
                        query.append(param.name, param.value);
                    });
                }

                xhr.open(method, url+'', true);

                xhr.setRequestHeader('Authorization', 'OAuth ' + toHeaderString(headerParams));
                xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

                headers.forEach(function(param) {
                    xhr.setRequestHeader(param.name, param.value);
                });

                xhr.send(query);
            };

            return this;
        },

        /**
         * Wrapper for GET OAuth.request
         *
         * @param url {string} vaild http(s) url
         * @param success {function} callback for a successful request
         * @param failure {function} callback for a failed request
         */
        get: function (url, success, failure) {
            this.request({'url': url, 'success': success, 'failure': failure});
        },

        /**
         * Wrapper for POST OAuth.request
         *
         * @param url {string} vaild http(s) url
         * @param data {object} A key value paired object of data
         *                      example: {'q':'foobar'}
         *                      for GET this will append a query string
         * @param success {function} callback for a successful request
         * @param failure {function} callback for a failed request
         */
        post: function (url, data, success, failure) {
            this.request({'method': 'POST', 'url': url, 'data': data, 'success': success, 'failure': failure});
        },

        /**
         * Wrapper to parse a JSON string and pass it to the callback
         *
         * @param url {string} vaild http(s) url
         * @param success {function} callback for a successful request
         * @param failure {function} callback for a failed request
         */
        getJSON: function (url, success, failure) {
            this.get(url, function (data) {
                success(JSON.parse(data.text));
            }, failure);
        },

        /**
         * Wrapper to parse a JSON string and pass it to the callback
         *
         * @param url {string} vaild http(s) url
         * @param success {function} callback for a successful request
         * @param failure {function} callback for a failed request
         */
        postJSON: function (url, data, success, failure) {
            this.request({
                'method': 'POST',
                'url': url,
                'data': JSON.stringify(data),
                'success': function (data) {
                    success(JSON.parse(data.text));
                },
                'failure': failure,
                'headers': {
                    'Content-Type': 'application/json'
                }
            });
        },

        parseTokenRequest: function (tokenRequest, content_type) {

            switch(content_type)
            {
                case "text/xml":
                    var token = tokenRequest.xml.getElementsByTagName('token');
                    var secret = tokenRequest.xml.getElementsByTagName('secret');

                    obj[OAuth.urlDecode(token[0])] = OAuth.urlDecode(secret[0]);
                    break;

                default:
                    var i = 0, arr = tokenRequest.text.split('&'), len = arr.length, obj = {};
                    for (; i < len; ++i) {
                        var pair = arr[i].split('=');
                        obj[OAuth.urlDecode(pair[0])] = OAuth.urlDecode(pair[1]);
                    }
            }


            return obj;
        },

        fetchRequestToken: function (success, failure) {
            var oauth = this;
            oauth.setAccessToken('', '');

            var url = oauth.authorizationUrl;
            this.get(this.requestTokenUrl, function (data) {
                var token = oauth.parseTokenRequest(data, data.responseHeaders['Content-Type'] || undefined);
                oauth.setAccessToken([token.oauth_token, token.oauth_token_secret]);
                success(url + '?' + data.text);
            }, failure);
        },

        fetchAccessToken: function (success, failure) {
            var oauth = this;
            this.get(this.accessTokenUrl, function (data) {
                var token = oauth.parseTokenRequest(data, data.responseHeaders['Content-Type'] || undefined);
                oauth.setAccessToken([token.oauth_token, token.oauth_token_secret]);

                // clean up a few un-needed things
                oauth.setVerifier('');

                success(data);
            }, failure);
        }
    };

    OAuth.signatureMethod = {
        /**
         * Sign the request
         *
         * @param consumer_secret {string} the consumer secret
         * @param token_secret {string}  the token secret
         * @param signature_base {string}  the signature base string
         */
        'HMAC-SHA1': function (consumer_secret, token_secret, signature_base) {
            var passphrase, signature, encode = OAuth.urlEncode;

            consumer_secret = encode(consumer_secret);
            token_secret = encode(token_secret || '');

            passphrase = consumer_secret + '&' + token_secret;
            signature = HMAC(SHA1.prototype, passphrase, signature_base);

            return global.btoa(signature);
        }
    };

    /**
     * Get a string of the parameters for the OAuth Authorization header
     *
     * @param params {ParamList} A list of data.
     */
    function toHeaderString(params) {
        var list = new ParamList(), i, realm, encode = OAuth.urlEncode, arr = [];

        params.forEach(function(param) {
            if (param.value !== '') {
                if (param.name.toLowerCase() === 'realm') {
                    realm = encode(param.name) + '="' + encode(param.value) + '"'
                } else {
                    list.push(
                        new Param(
                            param.name,
                            param.value
                        )
                    );
                }
            }
        });

        // encode sorted list
        list.sort().forEach(function(param) {
            arr.push(encode(param.name) + '="' + encode(param.value) + '"');
        });

        // add realm to start
        if (realm) {
            arr.unshift(realm);
        }

        return arr.join(', ');
    }

    /**
     * Generate a signature base string for the request
     *
     * @param method {string} ['GET', 'POST', 'PUT', ...]
     * @param url {string} A valid http(s) url
     * @param header_params {ParamList} List of additional headers
     * @param query_params {ParamList} List of POST data or query parameters.
     */
    function toSignatureBaseString(method, url, header_params, query_params) {
        var list = new ParamList(), i, encode = OAuth.urlEncode, noEmpty = new ParamList();

        list = list.concat(header_params).concat(query_params);

        list.removeByName('oauth_signature');

        list.sort().forEach(function(param) {
            if (param.value !== '') {
                noEmpty.push(param);
            }
        });

        return [
            method,
            encode(url),
            encode(noEmpty.join('&'))
        ].join('&');
    }

    /**
     * Generate a timestamp for the request
     */
    function getTimestamp() {
        return parseInt(+new Date() / 1000, 10); // use short form of getting a timestamp
    }

    /**
     * Generate a nonce for the request
     *
     * @param key_length {number} Optional nonce length
     */
    function getNonce(key_length) {
        function rand() {
            return Math.floor(Math.random() * chars.length);
        }

        key_length = key_length || 64;

        var key_bytes = key_length / 8, value = '', key_iter = key_bytes / 4,
        key_remainder = key_bytes % 4, i,
        chars = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
                     '2A', '2B', '2C', '2D', '2E', '2F', '30', '31', '32', '33',
                     '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D',
                     '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47',
                     '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51',
                     '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B',
                     '5C', '5D', '5E', '5F', '60', '61', '62', '63', '64', '65',
                     '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F',
                     '70', '71', '72', '73', '74', '75', '76', '77', '78', '79',
                     '7A', '7B', '7C', '7D', '7E'];

        for (i = 0; i < key_iter; i++) {
            value += chars[rand()] + chars[rand()] + chars[rand()]+ chars[rand()];
        }

        // handle remaing bytes
        for (i = 0; i < key_remainder; i++) {
            value += chars[rand()];
        }

        return value;
    }

    /**
     * rfc3986 compatable encode of a string
     *
     * @param {String} string
     */
    OAuth.urlEncode = function (string) {
        function hex(code) {
            var hex = code.toString(16).toUpperCase();
            if (hex.length < 2) {
                hex = 0 + hex;
            }
            return '%' + hex;
        }

        if (!string) {
            return '';
        }

        string = string + '';
        var reserved_chars = /[ \t\r\n!*"'();:@&=+$,\/?%#\[\]<>{}|`^\\\u0080-\uffff]/,
            str_len = string.length, i, string_arr = string.split(''), c;

        for (i = 0; i < str_len; i++) {
            if (c = string_arr[i].match(reserved_chars)) {
                c = c[0].charCodeAt(0);

                if (c < 128) {
                    string_arr[i] = hex(c);
                } else if (c < 2048) {
                    string_arr[i] = hex(192+(c>>6)) + hex(128+(c&63));
                } else if (c < 65536) {
                    string_arr[i] = hex(224+(c>>12)) + hex(128+((c>>6)&63)) + hex(128+(c&63));
                } else if (c < 2097152) {
                    string_arr[i] = hex(240+(c>>18)) + hex(128+((c>>12)&63)) + hex(128+((c>>6)&63)) + hex(128+(c&63));
                }
            }
        }

        return string_arr.join('');
    };

    /**
     * rfc3986 compatable decode of a string
     *
     * @param {String} string
     */
    OAuth.urlDecode = function (string){
        if (!string) {
            return '';
        }

        return string.replace(/%[a-fA-F0-9]{2}/ig, function (match) {
            return String.fromCharCode(parseInt(match.replace('%', ''), 16));
        });
    };
