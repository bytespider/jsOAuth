function OAuthServiceOAuthSandbox(key, secret, token, token_secret) {
    var parent = OAuthServiceOAuthSandbox.prototype;
    
    if (arguments.length > 0) {
        this.init(key, secret, token, token_secret);
    }

    this.realm = 'http://oauth-sandbox.sevengoslings.net/';
    this.accessTokenUrl = this.realm + 'access_token';
    this.authorizationUrl = this.realm + 'authorize';
    this.requestTokenUrl = this.realm + 'request_token';
    
    this.twoLegged = function() {
        var url = 'http://oauth-sandbox.sevengoslings.net/two_legged';
    }
    this.threeLegged = function() {
        var url = 'http://oauth-sandbox.sevengoslings.net/three_legged';
    }
    
    this.init = function(key, secret, token, token_secret) {
        parent.init.apply(this, arguments);
    }
    
}

OAuthServiceOAuthSandbox.prototype = new OAuthService();
