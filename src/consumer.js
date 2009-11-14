	/**
     * Main OAuth consumer
     * @author Rob Griffiths
     *
     * @constructor
     * @param {String} key
     * @param {String} secret
     * @param {String=} callback_url
     */
    jsOAuth = function (key, secret, callback_url) {
        var args = arguments, args_callee = args.callee, 
			args_length = args.length, jsOAuth = this;
			
        if (!(this instanceof args_callee)) {
            return new args_callee(key, secret, callback_url);
        }
        
        //require both params unless the first is null, then we were inherited
        if (args_length < 2 && args[0] !== null) {
            throw new Error('jsOAuth requires a key and secret to be provided');
        }
        
        /** @type {String|undefined} */
        jsOAuth.key = key;
        
        /** @type {String|undefined} */
        jsOAuth.secret = secret;
        
        /** @type {Url|null} */
        jsOAuth.callback_url = callback_url ? new Url(callback_url) : null;
		
        return jsOAuth;
    };
    
    jsOAuth.prototype.OAUTH_REALM              = '';       /** @const */
    
    jsOAuth.prototype.OAUTH_REQUEST_TOKEN_URL  = '';       /** @const */
    jsOAuth.prototype.OAUTH_REQUEST_AUTH_URL   = '';       /** @const */
    jsOAuth.prototype.OAUTH_GET_TOKEN_URL      = '';       /** @const */
    
    jsOAuth.prototype.HTTP_METHOD_GET          = 'GET';    /** @const */
    jsOAuth.prototype.HTTP_METHOD_POST         = 'POST';   /** @const */
    jsOAuth.prototype.HTTP_METHOD_PUT          = 'PUT';    /** @const */
    jsOAuth.prototype.HTTP_METHOD_DELETE       = 'DELETE'; /** @const */
    
    jsOAuth.prototype.OAUTH_VERSION            = '1.0';    /** @const */
    
    /**
     * Make a call to the Service Provider
     * 
     * @constructor
     * @memberOf jsOAuth
     * @param {String} url
     * @param {String=} method
     * @param {Object=} parameters
     */
    jsOAuth.prototype.Request = function (url, method, parameters) {
        // W3C compliant platforms only
		var args = arguments, args_callee = args.callee, 
			args_length = args.length, Request = this, 
			xhr = new XMLHttpRequest(), async = true;
			
        if (!(this instanceof args_callee)) {
            return new args_callee(method, url, parameters);
        }
        
        /** @type {Url|undefined} */
        Request.method = (method) ? method : jsOAuth.HTTP_METHOD_POST;
        Request.url = (url) ? url : '';
        Request.parameters = parameters;
        
        // Open the connection
        xhr.open(method, url, async);
        
        /**
         * A wrapper for XMLHttpRequest.setRequestHeader
         * 
         * @param {String} header
         * @param {String} value
         */
        Request.setHeader = function (header, value) {
            xhr.setRequestHeader(header, value);
        };
        
        /**
         * Get a parameter from the stack
         * 
         * @param {String} parameter
         */
        Request.getParameter = function (parameter) {
            return that.hasOwnProperty(parameter) ? that.parameters[parameter] : undefined;
        };
        
		/**
		 * Set a parameter
		 * 
		 * @param {String} parameter
		 * @param {String|Object=} value
		 */
        Request.setParameter = function (parameter, value) {
			value = value ? value : '';
            that.parameters[parameter] = value;
        };
        
        return Request;
    };
    
	jsOAuth.prototype.getRequestToken = function () {
        var request = new this.Request(
          this.HTTP_METHOD_POST, this.OAUTH_REQUEST_TOKEN_URL, {});
    };
    jsOAuth.prototype.requestAuthorization = function () {};
    jsOAuth.prototype.getAccessToken = function () {};
    
    
    window.jsOAuth = jsOAuth;
