    /** @const */ var OAUTH_VERSION_1_0 = '1.0';
    /** @const */ var OAUTH_VERSION_2_0 = '2.0';

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

                consumerKey: options.consumerKey,
                consumerSecret: options.consumerSecret,
                accessTokenKey: options.accessTokenKey || empty,
                accessTokenSecret: options.accessTokenSecret || empty,
                verifier: '',

                signatureMethod: options.signatureMethod || 'HMAC-SHA1'
            };

            this.realm = options.realm || empty;
            this.requestTokenUrl = options.requestTokenUrl || empty;
            this.authorizationUrl = options.authorizationUrl || empty;
            this.accessTokenUrl = options.accessTokenUrl || empty;

            this.getAccessToken = function () {
                return [oauth.accessTokenKey, oauth.accessTokenSecret];
            };

            this.setAccessToken = function (tokenArray) {
                oauth.accessTokenKey = tokenArray[0];
                oauth.accessTokenSecret = tokenArray[1];
            }

            this.getAccessToken = function () {
                return [oauth.accessTokenKey, oauth.accessTokenSecret];
            };

            this.setAccessToken = function (tokenArray) {
                oauth.accessTokenKey = tokenArray[0];
                oauth.accessTokenSecret = tokenArray[1];
            }

            /**
             * Makes an authenticated http request
             *
             * @param options {object}
             *      method {string} ['GET', 'POST', 'PUT', ...]
             *      url {string} A valid http(s) url
             *      data {object} A key value paired object of data
             *                      example: {'q':'foobar'}
             *                      for GET this will append a query string
             *      headers {object} A key value paired object of additional headers
             *      success {function} callback for a sucessful request
             *      failure {function} callback for a failed request
             */
            this.request = function (options) {
                var method, url, data, headers, success, failure, xhr, i,
                    headerParams, signatureMethod, signatureString, signature,
                    query = [];

                method = options.method || 'GET';
                url = options.url;
                data = options.data || {};
                headers = options.headers || {};
                success = options.success || function (data) {};
                failure = options.failure || function () {};

                if (oauth.enablePrivilege) {
                    netscape.security.PrivilegeManager
                        .enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
                }

                xhr = Request(oauth.debug);
                xhr.onreadystatechange = function () {
                    if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                        success({text: xhr.responseText});//, xml: xhr.responseXML});
                    } else if(xhr.readyState == 4 && xhr.status != 200 && xhr.status != 0) {
                        failure({text: xhr.responseText});//, xml: xhr.responseXML});
                    }
                };

                for(i in data) {
                    query.push(i + '=' + data[i]);
                }

                headerParams = {
                    'oauth_callback': 'oob',
                    'oauth_consumer_key': oauth.consumerKey,
                    'oauth_token': oauth.accessTokenSecret,
                    'oauth_signature_method': oauth.signatureMethod,
                    'oauth_timestamp': getTimestamp(),
                    'oauth_nonce': getNonce(),
                    'oauth_verifier': oauth.verifier,
                    'oauth_version': OAUTH_VERSION_1_0
                };

                signatureMethod = oauth.signatureMethod;

                signatureString = toSignatureBaseString(method, url, headerParams, query);
                signature = OAuth['signatureMethod'][signatureMethod](oauth.consumerSecret, oauth.accessTokenSecret, signatureString);

                headerParams.oauth_signature = signature;

                query = query.sort().join('&');
                if(method == 'GET') {
                    if (query) {
                        url += '?' + query;
                    }
                    query = null;
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }

                xhr.open(method, url, true);

                xhr.setRequestHeader('Authorization', 'OAuth ' + toHeaderString(headerParams));
                xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
                for (i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.send(query);
            }

            return this;
        },

        authenticate: function (options, success, failure) {
            var self = this;
            var accessToken = this.getAccessToken();
            if (!(accessToken[0] && accessToken[1])) {
                var args = Array.slice.call(arguments);
                var reqSuccess = function () {
                    self.authenticate.apply(self, args);
                }
                this.getRequestToken({}, reqSuccess);
            } else {

                if (this.oauth_verifier) {
                    success(this);
                } else {
                    var url = this.authorizeToken();
                    window.open(url);
                }
            }
        },

        deauthenticate: function (options, success) {},

        request: '',
        getAccessToken: '',
        setAccessToken: '',

        getRequestToken: function (options, success, failure) {
            this.request({
                method: 'POST',
                url: this.requestTokenUrl,
                success: function (data) {
                    console.log(data);
                },
                failure: function (data) {
                    console.log(data);
                }
            });
        },

        authorizeToken: function () {

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
            } , failure);
        }

        /**
         * Wrapper for JSON pasrsed GET OAuth.request
         *
         * @param url {string} vaild http(s) url
         * @param success {function} callback for a successful request
         * @param failure {function} callback for a failed request
         */
        /*getXML: function (url, success, failure) {
            this.get(url, function (data) {
                success(data.xml);
            } , failure);
        }*/
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
            var passphrase, signature;

            consumer_secret = OAuth.urlEncode(consumer_secret);
            token_secret = OAuth.urlEncode(token_secret || '');

            passphrase = consumer_secret + '&' + token_secret;
            signature = HMAC(SHA1.prototype, passphrase, signature_base);

            return global.btoa(signature);
        }
    };

    /**
     * Get a string of the parameters for the OAuth Authorization header
     *
     * @param params {object} A key value paired object of data
     *                           example: {'q':'foobar'}
     *                           for GET this will append a query string
     */
    function toHeaderString(params) {
        var arr = [], i;

        for (i in params) {
            if (params[i] && params[i] != undefined && params[i] != '') {
                arr.push(i + '="' + OAuth.urlEncode(params[i]+'') + '"');
            }
        }

        return arr.sort().join(', ');
    }

    /**
     * Generate a signature base string for the request
     *
     * @param method {string} ['GET', 'POST', 'PUT', ...]
     * @param url {string} A valid http(s) url
     * @param header_params A key value paired object of additional headers
     * @param query_params {object} A key value paired object of data
     *                               example: {'q':'foobar'}
     *                               for GET this will append a query string
     */
    function toSignatureBaseString(method, url, header_parms, query_params) {
        var arr = [], i;

        for (i in header_parms) {
            if (header_parms[i] && header_parms[i] != undefined && header_parms[i] != '') {
                arr.push(OAuth.urlEncode(i) + '=' + OAuth.urlEncode(header_parms[i]+''));
            }
        }

        for (i in query_params) {
            if (query_params[i] && query_params[i] != undefined && query_params[i] != '') {
                if (!oauth_header_params[i]) {
                    arr.push(OAuth.urlEncode(i) + '=' + OAuth.urlEncode(query_params[i]+''));
                }
            }
        }

        return [
            method,
            OAuth.urlEncode(url),
            OAuth.urlEncode(arr.sort().join('&'))
        ].join('&');
    }

    /**
     * Generate a timestamp for the request
     */
    function getTimestamp() {
        return parseInt(+new Date / 1000, 10); // use short form of getting a timestamp
    };

    /**
     * Generate a nonce for the request
     *
     * @param key_length {number} Optional nonce length
     */
    function getNonce(key_length) {
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

        function rand() {
            return Math.floor(Math.random() * chars.length);
        }

        return value;
    };

    /**
     * Url encode a string
     *
     * @param string {string} string to be url encoded
     */
    OAuth.urlEncode = function (string) {
        if (!string) return '';

        string = string + '';
        var reserved_chars = / |!|\*|"|'|\(|\)|;|:|@|&|=|\+|\$|,|\/|\?|%|#|\[|\]|<|>|{|}|\||\\|`|\^/,
            str_len = string.length, i, string_arr = string.split('');

        for (i = 0; i < str_len; i++) {
            if (string_arr[i].match(reserved_chars)) {
                string_arr[i] = '%' + (string_arr[i].charCodeAt(0)).toString(16).toUpperCase();
            }
        }

        return string_arr.join('');
    };

    /**
     * Url decode a string
     *
     * @param string {string} string to be url decoded
     */
    OAuth.urlDecode = function (string){
        if (!string) return '';

        return string.replace(/%[a-fA-F0-9]{2}/ig, function (match) {
            return String.fromCharCode(parseInt(match.replace('%', ''), 16));
        });
    };
