	/**
     * Url
     * 
     * @constructor
     * @param {String} url
     */
    Url = function () {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            parsed_url, scheme, host, port, path, query, anchor,
            parser = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/
			Url = this;

		if (!(Url instanceof args_callee)) {
            return new args_callee(args);
        }
		
		Url.scheme = EMPTY_STRING;
		Url.host = EMPTY_STRING;
		Url.port = EMPTY_STRING;
		Url.path = EMPTY_STRING;
		Url.query = new QueryString();
		Url.anchor = EMPTY_STRING;
        
		if (args_length > 0 && args[0] !== NULL) {
			parsed_url = args[0].match(parser);
			
			
			scheme = parsed_url[1];
			host = parsed_url[2];
			port = parsed_url[3];
			path = parsed_url[4];
			query = parsed_url[5];
			anchor = parsed_url[6];
			
			scheme = (scheme !== UNDEFINED) ? scheme.replace('://', EMPTY_STRING).toLowerCase() : 'http';
			port = (port ? port.replace(':', EMPTY_STRING) : (scheme === 'https' ? '443' : '80'));
			// correct the scheme based on port number
			scheme = (scheme == 'http' && port === '443' ? 'https' : scheme);
			query = query ? query.replace('?', EMPTY_STRING) : EMPTY_STRING;
			anchor = anchor ? anchor.replace('#', EMPTY_STRING) : EMPTY_STRING;
			
			
			// Fix the host name to include port if non-standard ports were given
			if ((scheme === 'https' && port !== '443') || (scheme === 'http' && port !== '80')) {
				host = host + ':' + port;
			}
			
			Url.scheme = scheme;
			Url.host = host;
			Url.port = port;
			Url.path = (path !== UNDEFINED) ? path : '/';
			Url.query.setQueryParams(query);
			Url.anchor = (anchor !== UNDEFINED) ? anchor : EMPTY_STRING;
		}
        /**
         * Returns the url string
         * 
         * @memberOf Url
         * @return {String}
         */
        Url.toString = function () {
			console.log(this.query != EMPTY_STRING);
            return this.scheme + '://' + this.host + this.path + (this.query != EMPTY_STRING ? '?' + this.query : EMPTY_STRING)  + (this.anchor !== EMPTY_STRING ? '#' + this.anchor : EMPTY_STRING);
        };
    };
    
    QueryString = function () {
        var args = arguments, args_callee = args.callee, args_length = args.length, 
			QueryString = this;
        if (!(QueryString instanceof args_callee)) {
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
    
    // Only give to the world if they want it
    if (window.Url === UNDEFINED) { window.Url = Url }
