function OAuthServiceGoogle(options) {
    var parent = OAuthServiceGoogle.prototype;
    
    if (arguments.length > 0) {
        this.init(options);
    }

    this.signature_method = 'HMAC-SHA1';

    this.realm = 'https://www.google.com/accounts/';
    this.accessTokenUrl = this.realm + 'OAuthGetAccessToken';
    this.authenticationUrl = '';
    this.authorizationUrl = this.realm + 'OAuthAuthorizeToken';
    this.requestTokenUrl = this.realm + 'OAuthGetRequestToken';
    
    this.init = function(options) {
        parent.init.apply(this, arguments);
    }
        
}

OAuthServiceGoogle.prototype = new OAuthService();
