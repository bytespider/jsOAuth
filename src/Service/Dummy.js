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
    
    jsOAuth.Service.Dummy = function (key, secret, callback_url) {
        var args = arguments, args_callee = args.callee, 
            args_length = args.length, jsOAuthServiceDummy = this;
            
        if (!(this instanceof args_callee)) {
            return new args_callee(key, secret, callback_url, app_id);
        }
        
        // call parent constructor
        jsOAuthServiceDummy.constructor(key, secret, callback_url);
        jsOAuthServiceDummy.OAUTH_REALM = 
          'http://localhost/oauth/'; /** @const */
        
        jsOAuthServiceDummy.OAUTH_REQUEST_TOKEN_URL = 
            jsOAuthServiceDummy.OAUTH_REALM + 'request_token.php'; /** @const */
         
        jsOAuthServiceDummy.OAUTH_REQUEST_AUTH_URL = 
            jsOAuthServiceDummy.OAUTH_REALM + ''; /** @const */
         
        jsOAuthServiceDummy.OAUTH_GET_TOKEN_URL = 
            jsOAuthServiceDummy.OAUTH_REALM + 'access_token.php'; /** @const */
        
        return jsOAuthServiceDummy;
    };
    
    /* 
     * Set prototype up with null as jsOAuth requires key and secret
     * but we don't know them until new jsOAuth.Service.Dummy() is called
     */
    window.jsOAuth.Service.Dummy.prototype = new jsOAuth(NULL);
})();