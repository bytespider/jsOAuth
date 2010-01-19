function OAuthService(key, secret, callback_url, token, token_secret) {
    var parent = OAuthService.prototype;
    
    this.init = function(key, secret, callback_url, token, token_secret) {
        this.key = key || '';
        this.secret = secret || '';
        this.callback_url = callback_url || '';
        this.token = token || '';
        this.token_secret = token_secret || '';
        
        parent.init.apply(this, arguments);
    };
            
    if (arguments.length > 0) {
        this.init(key, secret, token, token_secret);
    }
}

OAuthService.prototype = new OAuthConsumer();
