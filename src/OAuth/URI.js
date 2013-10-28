    /**
     * Url
     *
     * @constructor
     * @param {String} url
     */
    function URI(url) {
        var args = arguments, args_callee = args.callee,
            parsed_uri, scheme, host, port, path, query, anchor,
            parser = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/,
            uri = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(url);
        }

        uri.scheme = '';
        uri.host = '';
        uri.port = '';
        uri.path = '';
        uri.query = new QueryString();
        uri.anchor = '';

        if (url !== null) {
            parsed_uri = url.match(parser);

            scheme = parsed_uri[1];
            host = parsed_uri[2];
            port = parsed_uri[3];
            path = parsed_uri[4];
            query = parsed_uri[5];
            anchor = parsed_uri[6];

            scheme = (scheme !== undefined) ? scheme.replace('://', '').toLowerCase() : 'http';
            port = (port ? port.replace(':', '') : (scheme === 'https' ? '443' : '80'));
            // correct the scheme based on port number
            scheme = (scheme == 'http' && port === '443' ? 'https' : scheme);
            query = query ? query.replace('?', '') : '';
            anchor = anchor ? anchor.replace('#', '') : '';


            // Fix the host name to include port if non-standard ports were given
            if ((scheme === 'https' && port !== '443') || (scheme === 'http' && port !== '80')) {
                host = host + ':' + port;
            }

            uri.scheme = scheme;
            uri.host = host;
            uri.port = port;
            uri.path = path || '/';
            uri.query.setQueryParams(query);
            uri.anchor = anchor || '';
        }
    }

    URI.prototype = {
        scheme: '',
        host: '',
        port: '',
        path: '',
        query: '',
        anchor: '',
        toString: function () {
            var self = this, query = self.query + '';
            return self.scheme + '://' + self.host + self.path + (query != '' ? '?' + query : '') + (self.anchor !== '' ? '#' + self.anchor : '');
        }
    };

    /**
     * Create and manage a query string
     *
     * @param {Object} obj
     */
    function QueryString(arr) {
        QueryString.superclass.constructor.call(this, arr);
    }

    // QueryString is a type of param list, so inherit
    QueryString.prototype = new ParamList();
    QueryString.superclass = ParamList.prototype;
    QueryString.prototype.constructor = QueryString;

    /**
     *
     * @param {Object} query
     */
    QueryString.prototype.setQueryParams = function (query) {
        var args = arguments, args_length = args.length, i, query_array,
            query_array_length, querystring = this, key_value, decode = OAuth.urlDecode;

        if (args_length === 1) {
            if (typeof query === 'object') {
                if (query instanceof Array) {
                    // iterate array
                    for (i = 0; i < query.length; i++) {
                        if (query[i] instanceof Array && query[i].length === 2) {
                            querystring.push(
                                new Param(query[i][0]),
                                new Param(query[i][1])
                            );
                        }
                    }
                } else {
                    // iterate object
                    for (i in query) {
                        if (query.hasOwnProperty(i)) {
                            querystring.push(
                                new Param(i),
                                new Param(query[i])
                            );
                        }
                    }
                }
            } else if (typeof query === 'string') {
                // split string on '&'
                query_array = query.split('&');
                // iterate over each of the array items
                for (i = 0, query_array_length = query_array.length; i < query_array_length; i++) {
                    // split on '=' to get key, value
                    key_value = query_array[i].split('=');
                    if (key_value[0] !== '') {
                        querystring.push(
                            new Param(decode(key_value[0])),
                            new Param(decode(key_value[1]))
                        );
                    }
                }
            }
        } else {
            for (i = 0; i < args_length; i += 2) {
                // treat each arg as key, then value
                querystring.push(
                    new Param(args[i]),
                    new Param(args[i + 1])
                );
            }
        }
    };
