	/**
     * Url
     * 
     * @constructor
     * @param {String} url
     */
    Uri = function () {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            parsed_uri, scheme, host, port, path, query, anchor,
            parser = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/
            Uri = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(args);
        }
        
        Uri.scheme = '';
        Uri.host = '';
        Uri.port = '';
        Uri.path = '';
        Uri.query = new QueryString();
        Uri.anchor = '';
        
        if (args_length > 0 && args[0] !== NULL) {
            parsed_uri = args[0].match(parser);
            
            
            scheme = parsed_uri[1];
            host = parsed_uri[2];
            port = parsed_uri[3];
            path = parsed_uri[4];
            query = parsed_uri[5];
            anchor = parsed_uri[6];
            
            scheme = (scheme !== UNDEFINED) ? scheme.replace('://', '').toLowerCase() : 'http';
            port = (port ? port.replace(':', '') : (scheme === 'https' ? '443' : '80'));
            // correct the scheme based on port number
            scheme = (scheme == 'http' && port === '443' ? 'https' : scheme);
            query = query ? query.replace('?', '') : '';
            anchor = anchor ? anchor.replace('#', '') : '';
            
            
            // Fix the host name to include port if non-standard ports were given
            if ((scheme === 'https' && port !== '443') || (scheme === 'http' && port !== '80')) {
                host = host + ':' + port;
            }
            
            Uri.scheme = scheme;
            Uri.host = host;
            Uri.port = port;
            Uri.path = (path !== UNDEFINED) ? path : '/';
            Uri.query.setQueryParams(query);
            Uri.anchor = (anchor !== UNDEFINED) ? anchor : '';
        }
        /**
         * Returns the url string
         * 
         * @memberOf Uri
         * @return {String}
         */
        Uri.toString = function () {
            var query = this.query.asString();
            return this.scheme + '://' + this.host + this.path + 
                (query != '' ? '?' + query : '') +
                (this.anchor !== '' ? '#' + this.anchor : '');
        };
    };
    
    QueryString = function () {
        var args = arguments, args_callee = args.callee, args_length = args.length, 
            QueryString = this;
        
        if (!(this instanceof args_callee)) {
            return this.toString();
        }
        
        QueryString.queryParams = {};
        /**
         * 
         * @param {Object} query
         */
        QueryString.setQueryParams = function (query) {
            var args = arguments, args_length = args.length, i, query_array, 
                query_array_length, params = QueryString.queryParams, key_value;
            if (args_length == 1) {
                if (typeof query === TYPEOF_OBJECT) {
                    // iterate
                    for (i in query) {
                        if (query.hasOwnProperty(i)) {
                            params[i] = query[i];
                        }
                    }
                } else if (typeof query === TYPEOF_STRING) {
                    // split string on '&'
                    query_array = query.split('&');
                    // iterate over each of the array items
                    for (i = 0, query_array_length = query_array.length; i < query_array_length; i++) {
                        // split on '=' to get key, value
                        key_value = query_array[i].split('=');
                        params[key_value[0]] = key_value[1];
                    }
                }
            } else {
                for (i = 0; i < arg_length; i += 2) {
                    // treat each arg as key, then value
                    params[args[i]] = args[i+1];
                }
            }
            
            QueryString.queryParams = params;
        };
        
        /**
         * Returns the url query string
         * 
         * @memberOf QueryString
         * @return {String}
         */
        QueryString.toString = function () {
            var query = [], i, params = QueryString.queryParams;
            for (i in params) {
                if (params.hasOwnProperty(i) && params[i] !== UNDEFINED) {
                    query.push(i + '=' + params[i]);
                }
            }
            return query.join('&');
        };
        
        if (args_length > 0) {
            QueryString.setQueryParams(args);
        }
        
        return QueryString;
    };
   
    QueryString = function(obj){
        var args = arguments, args_callee = args.callee, args_length = args.length,
            i, querystring = this;
          
        if (!(this instanceof args_callee)) {
            return new args_callee(obj);
        }
        
        for(i in obj) {
            if (obj.hasOwnProperty(i)) {
                querystring[i] = obj[i];
            }
        }
        
        return querystring;
    };
    // QueryString is a type of collection So inherit
    QueryString.prototype = new Collection();
    
    QueryString.prototype.asString = function () {
        var i, self = this, q_arr = [], ret = '', 
        val = EMPTY_STRING, encode = QueryString.urlEncode;
        self.ksort(); // lexicographical byte value ordering of the keys
        
        for (i in self) {
            if (self.hasOwnProperty(i)) {
                val = (encode(i) + '=' + encode(self[i]));
                q_arr.push(val);
            }
        }

        if (q_arr.length > 0) {
            ret = q_arr.join('&');
        }

        return ret;
    };
    
    /**
     * 
     * @param {Object} query
     */
    QueryString.prototype.setQueryParams = function (query) {
        var args = arguments, args_length = args.length, i, query_array, 
            query_array_length, querystring = this, key_value;
            
        if (args_length == 1) {
            if (typeof query === TYPEOF_OBJECT) {
                // iterate
                for (i in query) {
                    if (query.hasOwnProperty(i)) {
                        querystring[i] = query[i];
                    }
                }
            } else if (typeof query === TYPEOF_STRING) {
                // split string on '&'
                query_array = query.split('&');
                // iterate over each of the array items
                for (i = 0, query_array_length = query_array.length; i < query_array_length; i++) {
                    // split on '=' to get key, value
                    key_value = query_array[i].split('=');
                    querystring[key_value[0]] = key_value[1];
                }
            }
        } else {
            for (i = 0; i < arg_length; i += 2) {
                // treat each arg as key, then value
                querystring[args[i]] = args[i+1];
            }
        }
    };
    
    /** 
     * rfc3986 compatable encode of a string
     * 
     * @param {String} string
     */
    QueryString.urlEncode = function (string){
        var reserved_chars = /( |\!|\*|\"|\'|\(|\)|\;|\:|\@|\&|\=|\+|\$|\,|\/|\?|\%|\#|\[|\]|\<|\>|\{|\}|\||\\|`|\^)/, 
            str_len = string.length, i, string_arr = string.split('');
                              
        for (i = 0; i < str_len; i++) {
            if (string_arr[i].match(reserved_chars)) {
                string_arr[i] = '%' + (string_arr[i].charCodeAt(0)).toString(16).toUpperCase();
            }
        }

        return string_arr.join('');
    };
    
    /** closure compiler "export" method, use quoted syntax */
    if (window['Uri'] === UNDEFINED) {
        // Only give to the world if they want it
        window['Uri'] = Uri
    }
