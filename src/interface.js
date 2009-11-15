(function(){
	var window = this, undefined,
		TYPEOF_OBJECT = 'object', 
		TYPEOF_STRING = 'string', 
		TYPEOF_FUNCTION = 'function', 
		TYPEOF_UNDEFINED = 'undefined',
		TYPEOF_NULL = 'null', 
		EMPTY_STRING = '',
		OBJECT = Object, 
		STRING = String, 
		FUNCTION = Function, 
		UNDEFINED = undefined,
		NULL = null,
		
		jsOAuth;
	
	/**
	 * OAuth Consumer
	 * 
	 * @constructor
	 * @param {String} key
	 * @param {String} secret
	 */
	jsOAuth = function (key, secret) {
		var args = arguments, args_callee = args.callee, args_length = args.length,
			token = EMPTY_STRING, jsoauth = this;
			
	    if (!(jsoauth instanceof args_callee)) {
	        return new jsOAuth(key, secret);
	    }
		
		jsoauth.key = key; /** @type {String|undefined} */
		jsoauth.secret = secret; /** @type {String|undefined} */
		jsoauth.callback_url = EMPTY_STRING;
		jsoauth.signature = EMPTY_STRING;
		jsoauth.signature_method = EMPTY_STRING;
		jsoauth.OAUTH_REALM = EMPTY_STRING;
		jsoauth.OAUTH_REQUEST_TOKEN_URL = EMPTY_STRING;
		jsoauth.OAUTH_REQUEST_AUTH_URL = EMPTY_STRING;
		jsoauth.OAUTH_GET_TOKEN_URL = EMPTY_STRING;
			
		jsoauth.oauth_parameters = {
			'oauth_consumer_key': key,
			'oauth_token': token,
			'oauth_signature_method': jsoauth.signature_method,
			'oauth_signature': jsoauth.signature,
			'oauth_timestamp': EMPTY_STRING,
			'oauth_nonce': EMPTY_STRING,
			'oauth_version': jsoauth.OAUTH_VERSION,
			'oauth_verifier': EMPTY_STRING
		};
		
		/**
		 * 
		 * @param {String} url
		 * @param {String} method
		 * @param {Object} parameters
		 */
		jsoauth.Request = function(url, method, parameters){
			var request = this;
			request = {
				url: url,
				method: method,
				parameters: (parameters !== UNDEFINED) ? parameters : {},
				setParameter: function (parameter, value) {
					parameters[parameter] = value;
				},
				getParameter: function (parameter) {
					return parameters.hasOwnProperty(parameter) ? parameters[parameter] : UNDEFINED;
				},
				sign: function (consumer, token, signature_method) {},
				timestamp: (new Date).getTime(),
				nonce: {
					toString: function() {
						var rtn, str = request.timestamp, 
							ts_length = str.length, c, hex_char;
						
						while (c < ts_length) {
							hex_char = str.charCodeAt(c++).toString(16);
							if (hex_char < 2) {
								hex_char = '0' + hex_char;
							}
							rtn += hex_char;
						}
						return rtn;
					}
				},
			};
				
			return request;
		};
			
		/**
		 * 
		 * @constructor
		 * @param {String} key
		 * @param {String} secret
		 */
		jsoauth.Token = function(key, secret){
		
		};
		
		/**
		 * @memberOf jsOAuth
		 */
		jsoauth.getRequestToken = function () {},
		
		/**
		 * @memberOf jsOAuth
		 */
		jsoauth.requestAuthorization = function () {},
		
		/**
		 * @memberOf jsOAuth
		 */
		jsoauth.getAccessToken = function () {}
		
		return jsoauth;
	};
	
	jsOAuth.HTTP_METHOD_GET          = 'GET';    /** @const */
	jsOAuth.HTTP_METHOD_POST         = 'POST';   /** @const */
	jsOAuth.HTTP_METHOD_PUT          = 'PUT';    /** @const */
	jsOAuth.HTTP_METHOD_DELETE       = 'DELETE'; /** @const */
	
	jsOAuth.OAUTH_VERSION            = '1.0';    /** @const */
	
	window.jsOAuth = jsOAuth;
}());