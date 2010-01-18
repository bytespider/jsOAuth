function OAuthServiceTwitter(key, secret, token, token_secret) {
    var parent = OAuthServiceTwitter.prototype;
    
    this.realm = 'https://twitter.com/oauth/';
    this.accessTokenUrl = this.realm + 'access_token';
    this.authenticationUrl = this.realm + 'authenticate';
    this.authorizationUrl = this.realm + 'authorize';
    this.requestTokenUrl = this.realm + 'request_token';
    
    this.init = function(key, secret, token, token_secret) {
        parent.init.apply(this, arguments);
    }
        
    if (arguments.length > 0) {
        this.init(key, secret, token, token_secret);
    }
}

OAuthServiceTwitter.prototype = new OAuthService();