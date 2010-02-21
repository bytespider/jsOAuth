function OAuthConsumer(options) {  
    var name = 'oauth';
    
    this.oauth_version = '1.0';
    this.signature_method = 'PLAINTEXT';
    
    this.consumer_token;
    this.access_token;
    
    this.cookie;
    
    this.getName = function () {
        return name;
    };
    
	this.xoauth_displayname = '';
	
    this.init = function(options) {
        // default to using cookies
        this.use_cookies = options.use_cookies == false ? false : true;
        
        this.debug = options.debug == false ? false : true;
        
        this.consumer_token = new OAuthToken(options.key, options.secret);
        this.access_token = new OAuthToken(options.token_key, options.token_secret);

        this.callback_url = options.callback_url || 'oob';

        this.oauth_verifier = options.oauth_verifier || '';
        
        this.onauthorized = options.onauthorized;
        
        if (options.use_cookies) {
            this.cookie = new OAuthCookie('oauth_token_' + this.getName());
            var values = this.cookie.getValue().split('|');
            if (values) {
                this.access_token.set(values[0], values[1]);
                this.oauth_verifier = values[2];
            }
        }
    };
    
    this.getDefaultRequestParams = function () {/*stub*/}
    this.getAuthorizationRequestParams = function () {
		return {oauth_token: this.access_token.key};
	}
   
    this.authorize = function(){
        if (!(this.access_token.key && this.access_token.secret)) {
            // need to get a access token
            this.getRequestToken();
        }
        
        if (this.access_token.key && this.access_token.secret && !this.oauth_verifier) {
            var url = this.authorizeToken();
            window.open(url);
            var verification = document.createElement('input');
            verification.setAttribute('type', 'text');
            verification.setAttribute('id', 'verification');
            document.body.appendChild(verification);
            
            var button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('id', 'verify');
            button.setAttribute('value', 'Verify');
            document.body.appendChild(button);
            
            var self = this;
            button.onclick = function() {
                var verification = document.getElementById('verification');
                self.oauth_verifier = verification.value;
                self.getAccessToken();
            };
        }
        
        if(this.access_token.key && this.access_token.secret && this.oauth_verifier){
            this.onauthorized.call(this);
        }
    };
    
    this.getRequestToken = function(){
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
		var header_params = this.getDefaultHeaderParams();
        
        var request = new OAuthRequest({
            method: 'POST', 
			url: this.requestTokenUrl, 
			query: this.getDefaultRequestParams(), 
			authorization_header_params: header_params
        });
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.consumer_token.key, this.access_token.secret
        );
		
		request.setAuthorizationHeaderParam('oauth_signature', signature);
		
		var header_string = 'OAuth ' + request.toHeaderString();

        var xhr = new XMLHttpRequest();
        xhr.open(request.getMethod(), request.getUrl(), false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', header_string);
        xhr.send(request.toQueryString());
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            // oauth_token=hh5s93j4hdidpola&oauth_token_secret=hdhd0244k9j7ao03&
            var token_string_params = xhr.responseText.split('&');
            for (var i = 0; i < token_string_params.length; i++) {
                var param = token_string_params[i].split('=');
                if (param[0] == 'oauth_token') {
                    this.access_token.key = OAuthUtilities.urlDecode(param[1]);
                }
                if (param[0] == 'oauth_token_secret') {
                    this.access_token.secret = OAuthUtilities.urlDecode(param[1]);
                }
            }
        }
        
        return this;
    };

    this.authorizeToken = function(){
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
		var request = new OAuthRequest({
            method: 'POST', 
			url: this.authorizationUrl, 
			query: this.getAuthorizationRequestParams()
        });
        
        return request + '';
    };
    
    this.getAccessToken = function(){
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
		var header_params = this.getDefaultHeaderParams();
        
        var request = new OAuthRequest({
            method: 'POST', 
			url: this.accessTokenUrl, 
			query: this.getDefaultAccessParams(), 
			authorization_header_params: header_params
        });
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.consumer_token.key, this.access_token.secret
        );
		
		request.setAuthorizationHeaderParam('oauth_signature', signature);
		
		var header_string = 'OAuth ' + request.toHeaderString();

        var xhr = new XMLHttpRequest();
        xhr.open(request.getMethod(), request.getUrl(), false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', header_string);
        xhr.send(request.toQueryString());
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            // oauth_token=hh5s93j4hdidpola&oauth_token_secret=hdhd0244k9j7ao03&
            var token_string_params = xhr.responseText.split('&');
            for (var i = 0; i < token_string_params.length; i++) {
                var param = token_string_params[i].split('=');
                if (param[0] == 'oauth_token') {
                    this.access_token.key = OAuthUtilities.urlDecode(param[1]);
                }
                if (param[0] == 'oauth_token_secret') {
                    this.access_token.secret = OAuthUtilities.urlDecode(param[1]);
                }
            }
			
			if (this.cookie != undefined) {
				this.cookie.setValue(this.token + '|' + this.token_secret + '|' + this.oauth_verifier);
			}
        }
		this.authorize();
        
        return this;
    };
    
    this.onauthorized = function(){};
	
	this.setXOAuthDisplayName = function (displayname) {
		this.xoauth_displayname = displayname;
	};
	
	this.getDefaultAccessParams = function () {return {}};
	
	this.getDefaultHeaderParams = function () {
		return {
			oauth_callback: this.callback_url,
			oauth_consumer_key: this.consumer_token.key,
			oauth_token: this.access_token.key,
			oauth_signature_method: this.signature_method + '',
			oauth_verifier: this.oauth_verifier,
			oauth_version: this.oauth_version,
			xoauth_displayname: this.xoauth_displayname
		};
	};
    
    if (arguments.length > 0) {
        this.init(options);
    }
}


OAuthConsumer.signatureMethods = {};
