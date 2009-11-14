(function(){
    var window = this, undefined, jsOAuth = window.jsOAuth,
	TYPEOF_OBJECT = 'object', TYPEOF_STRING = 'string', 
	TYPEOF_FUNCTION = 'function', TYPEOF_UNDEFINED = 'undefined',
	TYPEOF_NULL = 'null',
	OBJECT = Object, STRING = String, FUNCTION = Function, UNDEFINED = undefined,
	NULL = null;
    
    // if no other services has been initialized, initialize the Service namespace
	if (jsOAuth === UNDEFINED) { throw new Error('Missing required jsOAuth') }
	if (jsOAuth.Service == UNDEFINED) { jsOAuth.Service = {}; }
	
    jsOAuth.Service.Yahoo = function (key, secret, callback_url, app_id) {
        var args = arguments, args_callee = args.callee, 
			args_length = args.length, jsOAuthServiceYahoo = this;
			
        if (!(jsOAuthServiceYahoo instanceof args_callee)) {
            return new args_callee(key, secret, callback_url, app_id);
        }
        
        // call parent constructor
        jsOAuthServiceYahoo.constructor(key, secret, callback_url);
        jsOAuthServiceYahoo.OAUTH_REALM = 
          'https://api.login.yahoo.com/oauth/v2/';/** @const */
        
        jsOAuthServiceYahoo.OAUTH_REQUEST_TOKEN_URL = 
			jsOAuthServiceYahoo.OAUTH_REALM + 'get_request_token';/** @const */
         
        jsOAuthServiceYahoo.OAUTH_REQUEST_AUTH_URL = 
			jsOAuthServiceYahoo.OAUTH_REALM + 'request_auth';/** @const */
         
        jsOAuthServiceYahoo.OAUTH_GET_TOKEN_URL = 
			jsOAuthServiceYahoo.OAUTH_REALM + 'get_token';/** @const */
        
        jsOAuthServiceYahoo.app_id = app_id;
        
        return jsOAuthServiceYahoo;
    };
	
    /* 
     * Set prototype up with null as jsOAuth requires key and secret
     * but we don't know them until new YahooOAuth() is called
     */
    window.jsOAuth.Service.Yahoo.prototype = new jsOAuth(NULL);
})();