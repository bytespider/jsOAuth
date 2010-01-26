function OAuthServiceTwitter(options) {
    var parent = OAuthServiceTwitter.prototype;
    
    if (arguments.length > 0) {
        this.init(options);
    }

    this.signature_method = 'PLAINTEXT';

    this.realm = 'https://twitter.com/oauth/';
    this.accessTokenUrl = this.realm + 'access_token';
    this.authenticationUrl = this.realm + 'authenticate';
    this.authorizationUrl = this.realm + 'authorize';
    this.requestTokenUrl = this.realm + 'request_token';
    
    this.init = function(options) {
        parent.init.apply(this, arguments);
    }
        
}

OAuthServiceTwitter.prototype = new OAuthService();
