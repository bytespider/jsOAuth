/**
 * jsOAuth JavaScript OAuth Library v@VERSION
 *
 * @preserve Copyright (c) 2009 Rob Griffiths
 *
 * Date: 
 * Revision: 
 */

(function(window, undefined){
    var console = window.console,
		
		/**
		 * Url
		 * 
		 * @constructor
		 * @param {String} url
		 */
		Url = function(url) {
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
		    port = port ? port.replace(':', '') : (scheme == 'https' ? '443' : '80');
			// correct the scheme based on port number
			scheme = (scheme == '' && port == '443') ? 'https' : scheme;
			
		    query = query ? query.replace('?', '') : '';
		    anchor = anchor ? anchor.replace('#', '') : '';
			
		    
			// Fix the host name to include port if non-standard ports were given
		    if ((scheme == 'https' && port != '443') || (scheme == 'http' && port != '80')) {
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
			this.toString = function() {
				return scheme + '://' + host + path + (query ? '?' + query : '')  + (anchor ? '#' + anchor : '');
			};
		},
        
        /**
         * Main OAuth consumer
         *
         * @constructor
         * @param {String} key
         * @param {String} secret
         * @param {String=} callback_url
         */
        jsOAuth = function (key, secret, callback_url) {
            if (!(this instanceof arguments.callee)) {
                return new arguments.callee(key, secret, callback_url);
            }
            
            if (arguments.length < 2) {
                throw new Error('jsOAuth requires a key and secret to be provided');
            }
            
            /** @type {String|undefined} */
            this.key = key;
            
            /** @type {String|undefined} */
            this.secret = secret;
            
            /** @type {Url|undefined} */
            this.callback_url = callback_url ? new Url(callback_url) : null;
			console.log(this.callback_url.toString())
        };

        jsOAuth.prototype.OAUTH_REQUEST_TOKEN_URL = '';  /** @const */
        jsOAuth.prototype.OAUTH_REQUEST_AUTH_URL  = '';  /** @const */
        jsOAuth.prototype.OAUTH_GET_TOKEN_URL     = '';  /** @const */
        
        jsOAuth.prototype.getRequestToken = function () {};
        jsOAuth.prototype.requestAuthorization = function () {};
        jsOAuth.prototype.getAccessToken = function () {};
    
    window.jsOAuth = jsOAuth;
	
	// Only give to the world if they want it
	if (!window.Url) {window.Url = Url;}
})(window);
