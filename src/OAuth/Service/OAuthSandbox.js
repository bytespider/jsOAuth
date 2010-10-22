function OAuthServiceOAuthSandbox(options) {
    var parent = OAuthServiceOAuthSandbox.prototype;
    
    var _private = {
        debug : false
    };
    
    this.init = function(options) {
        _private.debug = 'debug' in options ? options.debug : _private.debug;
        parent.init.apply(this, arguments);
    };
    
    this.signature_method = 'HMAC-SHA1';
    
    this.realm = 'http://oauth-sandbox.sevengoslings.net/';
    this.requestTokenUrl = this.realm + 'request_token';
    this.authorizationUrl = this.realm + 'authorize';
    this.accessTokenUrl = this.realm + 'access_token';
    
    this.twoLegged = function() {
        this.authenticatedRequest(
                'http://oauth-sandbox.sevengoslings.net/two_legged', 'GET', {},
                function(data) {
                    console.log(data);
                });
    };
    
    this.threeLegged = function() {
        this.authenticatedRequest(
                'http://oauth-sandbox.sevengoslings.net/three_legged', 'GET', {},
                function(data) {
                    console.log(data);
                });
    };
    
    if (arguments.length > 0) {
        this.init(options);
    }
}

OAuthServiceOAuthSandbox.prototype = new OAuthService();
