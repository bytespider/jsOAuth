function OAuthService(options) {
    var parent = OAuthService.prototype;
    
    this.signature_method               = 'PLAINTEXT';
	
	this.realm                          = '';
    this.requestTokenUrl                = '';
    this.authorizationUrl               = '';
    this.accessTokenUrl                 = '';
    this.authenticationUrl              = '';
    
    this.init = function(options) {
        this.onauthorized = options.onauthorized;
        parent.init.apply(this, arguments);
    };
               
    if (arguments.length > 0) {
        this.init(options);
    }
}

OAuthService.prototype = new OAuthConsumer();
