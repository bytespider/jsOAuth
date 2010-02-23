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
    
    this.getDefaultHeaderParams = function () {
        var params = parent.getDefaultHeaderParams.apply(this);
        params.scope = this.getScope();
        
        return params;
    };
	
	this.getDefaultRequestParams = function () {
		return {'scope': this.getScope()}
	};

    this.getQueryParams = function () {
        return 'scope=' + OAuthUtilities.urlEncode('https://www.google.com/m8/feeds/');
    }

    this.getContacts = function () {
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
		var header_params = this.getDefaultHeaderParams();
        
        var request = new OAuthRequest({
            method: 'GET', 
			url: 'https://www.google.com/m8/feeds/contacts/default/full', 
			query: {'alt':'json'}, 
			authorization_header_params: header_params
        });
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.consumer_token.key, this.access_token.secret
        );
		
		request.setAuthorizationHeaderParam('oauth_signature', signature);
		
		var header_string = 'OAuth ' + request.toHeaderString();

        var xhr = new XMLHttpRequest();
        xhr.open(request.getMethod(), request.getUrl(), false);
        xhr.setRequestHeader('Authorization', header_string);
        xhr.send(request.toQueryString());
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            document.write(xhr.responseText);
        }
    }
    
    if (arguments.length > 0) {
        this.init(options);
    }
}

OAuthServiceGoogle.prototype = new OAuthService();
