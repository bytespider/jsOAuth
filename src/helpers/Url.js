/**
 * jsOAuth JavaScript OAuth Library v@VERSION
 * Url.js
 *
 * @preserve Copyright (c) 2009 Rob Griffiths
 *
 * Date: 
 * Revision: 
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
            var parsed_url, scheme, host, port, path, query, anchor, 
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
            this.query = query ? query : '';
            this.anchor = anchor ? anchor : '';
            
            /**
             * Returns the url string
             * 
             * @memberOf Url
             * @return {String}
             */
            this.toString = function () {
                return scheme + '://' + host + path + (query ? '?' + query : '')  + (anchor ? '#' + anchor : '');
            };

            
            this.setQueryParams = function (query) {
                var al = arguments.length, i;
                if (al <= 1) {
                    if (typeof query === 'object') {
                        // iterate
                    } else if (typeof query === 'string') {
                        // split string on '&'
                        // iterate over each of the array items
                        // split on '=' to get key, value
                    }
                } else {
                    for (i = 0; i < al; i = i + 2) {
                        // treat each arg as key, then value
                    }
                }
            };
        };
    
    // Only give to the world if they want it
    if (window.Url === undefined) {
		window.Url = Url;
	}
}());
