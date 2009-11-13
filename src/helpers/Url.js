/**
 * Url Helper
 * jsOAuth JavaScript OAuth Library v@VERSION
 *
 * @preserve Copyright (c) 2009 Rob Griffiths
 *
 * Date: @DATE
 * Revision: @REV
 */
(function () {
    var 
        window = this,
        undefined,
        /**
         * Url
         * 
         * @constructor
         * @param {String} url
         */
        Url = function (url) {
            var parsed_url, scheme, host, port, path, query, anchor, params = {},
                parser = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/;
                
            if (!(this instanceof arguments.callee)) {
                return this.toString();
            }
            
            parsed_url = url.match(parser);
            
            scheme = parsed_url[1];
            host = parsed_url[2];
            port = parsed_url[3];
            path = parsed_url[4];
            query = parsed_url[5];
            anchor = parsed_url[6];
            
            scheme = scheme ? scheme.replace('://', '').toLowerCase() : '';
            port = port ? port.replace(':', '') : (scheme === 'https' ? '443' : '80');
            // correct the scheme based on port number
            scheme = (scheme === '' && port === '443') ? 'https' : scheme;
            
            query = query ? query.replace('?', '') : '';
            anchor = anchor ? anchor.replace('#', '') : '';
            
            
            // Fix the host name to include port if non-standard ports were given
            if ((scheme === 'https' && port !== '443') || (scheme === 'http' && port !== '80')) {
                host = host + ':' + port;
                
            }
            
            this.scheme = scheme;
            this.host = host;
            this.port = port;
            this.path = path ? path : '/';
			this.query = new QueryString();
            this.anchor = anchor ? anchor : '';
            
            /**
             * Returns the url string
             * 
             * @memberOf Url
             * @return {String}
             */
            this.toString = function () {
				var query = params
                return scheme + '://' + host + path + (query ? '?' + query : '')  + (anchor ? '#' + anchor : '');
            };
			
			// finally call setQueryParams to set up params correctly
			this.setQueryParams(query);
			console.debug(params);
        },
		QueryString = function () {
            if (!(this instanceof arguments.callee)) {
                return this.toString();
            }
			
			this.queryParams = {};
			this.setQueryParams = function (query) {
                var arg_length = arguments.length, i, query_array, 
                    query_array_length, params = this.queryParams, key_value;
                if (arg_length <= 1) {
                    if (typeof query === 'object') {
                        // iterate
                        for (i in query) {
                            if (query.hasOwnProperty(i)) {
                                params[i] = query[i];
                            }
                        }
                    } else if (typeof query === 'string') {
                        // split string on '&'
                        query_array = query.spilt('&');
                        // iterate over each of the array items
                        query_array_length = query_array.length;
                        for (i = 0; i < query_array_length; i++) {
                            // split on '=' to get key, value
                            key_value = query_array[i].split('=');
                            params[key_value[0]] = key_value[1];
                        }
                    }
                } else {
                    for (i = 0; i < arg_length; i += 2) {
                        // treat each arg as key, then value
                        params[arguments[i]] = arguments[i+1];
                    }
                }
				
				this.queryParams = params;
            };
			
            /**
             * Returns the url query string
             * 
             * @memberOf QueryString
             * @return {String}
             */
            this.toString = function () {
                var query = [], i, params = this.queryParams;
				for (i in params) {
					if (params.hasOwnProperty(i)) {
						query.push(i + '=' + params[i]);
					}
				}
                return query.join('&');
            };
			
			if (arguments.length > 0) {
				this.setQueryParams(arguments);
			}
		};
    
    // Only give to the world if they want it
    if (window.Url === undefined) {
		window.Url = Url;
	}
}());
