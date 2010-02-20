function OAuthServiceGoogle(options) {
    var parent = OAuthServiceGoogle.prototype;
    
    var name = 'google';
	
	var scope = [];
    
    this.signature_method = 'HMAC-SHA1';

    this.realm = 'https://www.google.com/accounts/';
    this.requestTokenUrl = this.realm + 'OAuthGetRequestToken';
    this.authorizationUrl = this.realm + 'OAuthAuthorizeToken';
    this.accessTokenUrl = this.realm + 'OAuthGetAccessToken';
    this.authenticationUrl = null;

    
    this.init = function(options) {
        parent.init.apply(this, arguments);
    };
	
	this.setScope = function (scope_arr) {
		scope = scope_arr.slice(0);
	};
	
	this.getScope = function () {
		return scope.join(' ');
	};
    
    this.getHeaderParams = function () {
        var params = parent.getHeaderParams.apply(this);
        params.scope = this.getScope();
		
		alert(params);
        
        return params;
    };
	
	this.getDefaultRequestParams = function () {
		return {'scope': this.getScope()}
	};

    this.getQueryParams = function () {
        return 'scope=' + OAuthUtilities.urlEncode('https://www.google.com/m8/feeds/');
    }
    
    if (arguments.length > 0) {
        this.init(options);
    }
}

OAuthServiceGoogle.prototype = new OAuthService();