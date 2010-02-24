function OAuthServiceOAuthSandbox(options) {
    var parent = OAuthServiceOAuthSandbox.prototype;
    
    var _private = {
		debug: false
	};

    this.init = function(options) {
		_private.debug = 'debug' in options ? options.debug : _private.debug;
        parent.init.apply(this, arguments);
    };
    
    this.signature_method = 'PLAINTEXT'; 
    
    this.realm = 'http://oauth-sandbox.sevengoslings.net/';
    this.requestTokenUrl = this.realm + 'request_token';
    this.authorizationUrl = this.realm + 'authorize';
    this.accessTokenUrl = this.realm + 'access_token';
	
	this.twoLegged = function() {
		if (_private.debug) {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
		}
		
		var header_params = this.getAuthorizationHeaderParameters();
		
		var request = new OAuthRequest({
			method: 'GET', 
			url: 'http://oauth-sandbox.sevengoslings.net/two_legged', 
			query: {}, 
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
			alert(xhr.responseText);
		}
	};
    
    this.threeLegged = function() {
		if (_private.debug) {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
		}
		
		var header_params = this.getAuthorizationHeaderParameters();
		
		var request = new OAuthRequest({
			method: 'GET', 
			url: 'http://oauth-sandbox.sevengoslings.net/three_legged', 
			query: {}, 
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
			alert(xhr.responseText);
		}
	};
	
	if (arguments.length > 0) {
        this.init(options);
    }
}

OAuthServiceOAuthSandbox.prototype = new OAuthService();
