function OAuthServiceGoogle(options) {
    var parent = OAuthServiceGoogle.prototype;
	
	var _private = {
		debug: false,
		scope: []
	};
    
    this.signature_method = 'HMAC-SHA1';

    this.realm = 'https://www.google.com/accounts/';
    this.requestTokenUrl = this.realm + 'OAuthGetRequestToken';
    this.authorizationUrl = this.realm + 'OAuthAuthorizeToken';
    this.accessTokenUrl = this.realm + 'OAuthGetAccessToken';
    this.authenticationUrl = null;

    
    this.init = function(options) {
		_private.debug = 'debug' in options ? options.debug : _private.debug
        parent.init.apply(this, arguments);
    };
	
	this.setScope = function (scope_arr) {
		scope = scope_arr;
	};
	
	this.getScope = function () {
		return scope.join(' ');
	};
    
    this.getAuthorizationHeaderParameters = function () {
        var params = parent.getAuthorizationHeaderParameters.apply(this);
        params.scope = this.getScope();
        
        return params;
    };
	
	this.getDefaultRequestParams = function () {
		return {'scope': this.getScope()}
	};

    this.getQueryParams = function () {
        return 'scope=' + OAuthUtilities.urlEncode(this.getScope());
    }

    this.getContacts = function () {
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
		var header_params = this.getAuthorizationHeaderParameters();
        
        var request = new OAuthRequest({
            method: 'GET', 
			url: 'https://www.google.com/m8/feeds/contacts/default/full', 
			query: {'alt':'json'}, 
			authorization_header_params: header_params
        });
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.getConsumerToken().secret, this.getAccessToken().secret
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
