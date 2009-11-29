	/**
     * Main OAuth consumer
     * @author Rob Griffiths
     *
     * @constructor
     * @param {String} key
     * @param {String} secret
     * @param {String} callback_url
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
        jsOAuth.callback_url = new window.Url(callback_url);
		
        /** @type {String} */
        jsOAuth.token = EMPTY_STRING;
		jsOAuth.signature = '';
		
        return jsOAuth;
    };
    
    jsOAuth.prototype.OAUTH_REALM              = EMPTY_STRING;       /** @const */
    
    jsOAuth.prototype.OAUTH_REQUEST_TOKEN_URL  = EMPTY_STRING;       /** @const */
    jsOAuth.prototype.OAUTH_REQUEST_AUTH_URL   = EMPTY_STRING;       /** @const */
    jsOAuth.prototype.OAUTH_GET_TOKEN_URL      = EMPTY_STRING;       /** @const */
    
    jsOAuth.HTTP_METHOD_GET          = 'GET';    /** @const */
    jsOAuth.HTTP_METHOD_POST         = 'POST';   /** @const */
    jsOAuth.HTTP_METHOD_PUT          = 'PUT';    /** @const */
    jsOAuth.HTTP_METHOD_DELETE       = 'DELETE'; /** @const */
    
    jsOAuth.OAUTH_VERSION            = '1.0';    /** @const */
    
    /**
     * Make a call to the Service Provider
     * 
     * @constructor
     * @memberOf jsOAuth
     * @param {String} url
     * @param {String=} method
     * @param {Object=} parameters
     */
    jsOAuth.prototype.Request = function (oauth, url, method, parameters) {
		var args = arguments, args_callee = args.callee, 
			args_length = args.length, request = this, 
			xhr = new XMLHttpRequest(), // W3C compliant platforms only
			async = true, setAuthorizationHeader, date = new Date();
			
        if (!(this instanceof args_callee)) {
            return new args_callee(oauth, url, method, parameters);
        }
        
        /** @type {Url|undefined} */
        Request.url = url || '';
        Request.method = method || jsOAuth.HTTP_METHOD_POST;
        Request.parameters = parameters || {};
        
        // Open the connection
        xhr.open(Request.method, Request.url, async);
		
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
            return Request.hasOwnProperty(parameter) ? that.parameters[parameter] : undefined;
        };
        
		/**
		 * Set a parameter
		 * 
		 * @param {String} parameter
		 * @param {String|Object=} value
		 */
        Request.setParameter = function (parameter, value) {
			value = value || EMPTY_STRING;
            Request.parameters[parameter] = value;
        };
		
		/**
		 * Set standard OAuth header
		 */
		setAuthorizationHeader = function () {
			var ts = date.getTime(), auth_header = 'OAuth realm="' + oauth.OAUTH_REALM + '"' + 
				',oauth_consumer_key="' + oauth.key + '"'
				',oauth_token="' + oauth.token + '"'
				',oauth_signature_method="' + oauth.SIGNATURE_METHOD + '"'
				',oauth_signature="' + oauth.signature + '"'
				',oauth_timestamp="' + ts + '"'
				',oauth_timestamp="' + Request.generateNonce(ts) + '"'
				',oauth_version="' + oauth.OAUTH_VERSION + '"'
			request.setHeader('Authorization', auth_header);
		}();
		
        return Request;
    };
    
	jsOAuth.prototype.getRequestToken = function () {
		var oauth = this;
        var request = new jsoauth.Request(oauth, oauth.OAUTH_REQUEST_TOKEN_URL, Url.method, {});
    };
    jsOAuth.prototype.requestAuthorization = function () {};
    jsOAuth.prototype.getAccessToken = function () {};
    
    
    window.jsOAuth = jsOAuth;
