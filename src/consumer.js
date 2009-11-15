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
			
        if (!(jsOAuth instanceof args_callee)) {
            return new args_callee(key, secret, callback_url);
        }
        
        //require both params unless the first is null, then we were inherited
        if (args_length < 2 && args[0] !== NULL) {
            throw new Error('jsOAuth requires a key and secret to be provided');
        }
        
        /** @type {String|undefined} */
        jsOAuth.key = key;
        
        /** @type {String|undefined} */
        jsOAuth.secret = secret;
        
        /** @type {Url|null} */
        jsOAuth.callback_url = (callback_url !== UNDEFINED) ? new window.Url(callback_url) : NULL;
		
        return jsOAuth;
    };
    
    jsOAuth.prototype.OAUTH_REALM              = EMPTY_STRING;       /** @const */
    
    jsOAuth.prototype.OAUTH_REQUEST_TOKEN_URL  = EMPTY_STRING;       /** @const */
    jsOAuth.prototype.OAUTH_REQUEST_AUTH_URL   = EMPTY_STRING;       /** @const */
    jsOAuth.prototype.OAUTH_GET_TOKEN_URL      = EMPTY_STRING;       /** @const */
    
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
		var args = arguments, args_callee = args.callee, 
			args_length = args.length, Request = this, 
			xhr = new XMLHttpRequest(), // W3C compliant platforms only
			async = true, setAuthorizationHeader;
			
        if (!(Request instanceof args_callee)) {
            return new args_callee(method, url, parameters);
        }
        
        /** @type {Url|undefined} */
        Request.method = (method !== UNDEFINED) ? method : jsOAuth.HTTP_METHOD_POST;
        Request.url = (url !== UNDEFINED) ? url : EMPTY_STRING;
        Request.parameters = (parameters !== UNDEFINED) ? parameters : {};
        
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
			value = (value !== UNDEFINED) ? value : EMPTY_STRING;
            that.parameters[parameter] = value;
        };
		
		/**
		 * Set standard OAuth header
		 */
		setAuthorizationHeader = function () {
			var auth_header = args_callee.OAUTH_REALM;
			alert(auth_header);
			Request.setHeader('Authorization', auth_header);
		}();
		
        return Request;
    };
    
	jsOAuth.prototype.getRequestToken = function () {
        var request = new jsOAuth.Request(
          Url.method, this.OAUTH_REQUEST_TOKEN_URL, {});
    };
    jsOAuth.prototype.requestAuthorization = function () {};
    jsOAuth.prototype.getAccessToken = function () {};
    
    
    window.jsOAuth = jsOAuth;
