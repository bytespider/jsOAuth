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
		_private.debug = 'debug' in options ? options.debug : _private.debug;
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
	
	this.getRequestParameters = function () {
		return {'scope': this.getScope()}
	};

    this.getQueryParams = function () {
        return 'scope=' + OAuthUtilities.urlEncode(this.getScope());
    }

    this.getContacts = function () {
        if (_private.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
        var request = this.getSignedRequest({
            method: 'GET',
            url: 'https://www.google.com/m8/feeds/contacts/default/full',
            query: {},
        });

        var xhr = new XMLHttpRequest();
        xhr.open(request.getMethod(), request.getUrl(), false);
        
        var request_headers = request.getRequestHeaders();
        for (var header in request_headers) {
            xhr.setRequestHeader(header, request_headers[header]);
        }
        
        if (request.getMethod() === 'POST') {
            xhr.send(request.toQueryString());
        } else {
            xhr.send(null);
        }
        
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
			document.write((new XMLSerializer()).serializeToString(xhr.responseXML));
            document.mimeType = 'text/xml';
			
        }
    };
    
    if (arguments.length > 0) {
        this.init(options);
    }
}

OAuthServiceGoogle.prototype = new OAuthService();
