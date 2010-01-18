function OAuthService(key, secret, token, token_secret) {
    var parent = OAuthService.prototype;
    
    this.init = function(key, secret, token, token_secret) {
        this.key = key || '';
        this.secret = secret || '';
        this.token = token || '';
        this.token_secret = token_secret || '';
        
        parent.init.apply(this, arguments);
    };
    
    this.authenticateAccess = function(){
        if (!(this.token && this.token_secret)) {
            // need to get a access token
            this.requestToken();
        }
        
    };
        
    if (arguments.length > 0) {
        this.init(key, secret, token, token_secret);
    }
}

OAuthService.prototype = new OAuthConsumer();