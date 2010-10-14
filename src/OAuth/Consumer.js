/**
 * Core OAuth consumer client
 * 
 * @constructor
 * 
 * @param {Object}
 *            options
 * @return {OAuthConsumer}
 */
function OAuthConsumer(options) {  
    var OAUTH_VERSION = '1.0';
	
	// private variables prepended with _ as private is a protected word
    var _private = {
		debug: false,
		cookie: null,
		consumer_token: null,
		access_token: null,
		oauth_verifier: '',
		oauth_callback_url: 'oob',
		xoauth_displayname: ''
	};
	
	// Properties
    this.signature_method = 'PLAINTEXT';
    
	// Methods
	/**
     * @method
     * @param {Object|undefined}
     *            options
     * 
     */
    this.init = function (options) {
 		_private.debug = 'debug' in options ? options.debug : _private.debug;
        _private.consumer_token = new OAuthToken(options.consumer_key, options.consumer_secret);
        _private.access_token = new OAuthToken(options.token_key, options.token_secret);

        _private.oauth_callback_url = options.callback_url || _private.oauth_callback_url;

        _private.oauth_verifier = options.oauth_verifier || '';
        _private.xoauth_displayname = options.displayname || '';
        
        this.onAuthorized = options.onAuthorized || this.onAuthorized;
        
		
        _private.cookie = new OAuthCookie('oauth_token');
        var values = _private.cookie.getValue();
        if (values) {
            values = values.split('|');
			this.getAccessToken().set(values[0], values[1]);
			_private.oauth_verifier = values[2];
			this.onAuthorized.apply(this, [{}]);
		} else {
			this.onInitialized.apply(this, [{}]);
		}
		
    };
    
    /**
     * @method
     * @param {Object|undefined}
     *            options
     */
    this.authorize = function () {
        if (!(_private.access_token.key && _private.access_token.secret)) {
            // need to get a access token
            this.fetchRequestToken();
        }
        
        if (_private.access_token.key && _private.access_token.secret && !_private.oauth_verifier) {
			this.onAuthorization.apply(this, [
                {
                    url: this.getAuthorizeTokenUrl()
                }
			]);
        }
        
        if(_private.access_token.key && _private.access_token.secret && _private.oauth_verifier) {
            this.onAuthorized.apply(this, [{}]);
        }
    };
	
    /**
     * @method
     */
	this.deauthorize = function () {
        this.onDeauthorized.apply(this, [{}]);
    };
    
    /**
     * @method
     */
	this.getRequestParameters = function () {return {};};
	
    /**
     * @method
     * @return {String} oauth_verifier
     */
	this.getOAuthVerifier = function () {return _private.oauth_verifier;};
	
    /**
     * @method
     * @param {String}
     *            oauth_verifier
     */
	this.setOAuthVerifier = function (oauth_verifier) {
		_private.oauth_verifier = oauth_verifier;
    };
	
    /**
     * @method
     * @return {OAuthToken} consumer_token
     */
	this.getConsumerToken = function () {return _private.consumer_token};
	
    /**
     * @method
     * @return {OAuthToken} access_token
     */
	this.getAccessToken = function () {return _private.access_token};
	
    /**
     * @method
     */
    this.getAuthorizationHeaderParameters = function () {
        return {
            oauth_callback          : _private.oauth_callback_url,
            oauth_consumer_key      : this.getConsumerToken().key,
            oauth_token             : this.getAccessToken().key,
            oauth_signature_method  : this.signature_method + '',
            oauth_verifier          : this.getOAuthVerifier(),
            oauth_version           : OAUTH_VERSION,
            xoauth_displayname      : _private.xoauth_displayname
        };
    };
   
    /**
     * @method
     */
    this.fetchRequestToken = function () {
        if (_private.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
        
		var request = this.getSignedRequest({
			method: 'POST',
			url: this.requestTokenUrl,
			query: this.getRequestParameters()
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
            var token_string_params = xhr.responseText.split('&');
            for (var i = 0; i < token_string_params.length; i++) {
                var param = token_string_params[i].split('=');
                if (param[0] == 'oauth_token') {
                    this.getAccessToken().key = OAuthUtilities.urlDecode(param[1]);
                }
                if (param[0] == 'oauth_token_secret') {
                    this.getAccessToken().secret = OAuthUtilities.urlDecode(param[1]);
                }
            }
        }
        
        return this;
    };

    /**
     * @method
     */
    this.getAuthorizeTokenUrl = function () {
        if (_private.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
		var request = new OAuthRequest({
            method: 'GET', 
			url: this.authorizationUrl, 
			query: {oauth_token: this.getAccessToken().key}
        });
        
        return request + '';
    };
    
    /**
     * @method
     */
    this.fetchAccessToken = function () {
        if (_private.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
		
        var request = this.getSignedRequest({
            method: 'POST',
            url: this.accessTokenUrl,
            query: {oauth_verifier: this.getOAuthVerifier()}
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
            // oauth_token=hh5s93j4hdidpola&oauth_token_secret=hdhd0244k9j7ao03&
            var token_string_params = xhr.responseText.split('&');
            for (var i = 0; i < token_string_params.length; i++) {
                var param = token_string_params[i].split('=');
                if (param[0] == 'oauth_token') {
                    this.getAccessToken().key = OAuthUtilities.urlDecode(param[1]);
                }
                if (param[0] == 'oauth_token_secret') {
                    this.getAccessToken().secret = OAuthUtilities.urlDecode(param[1]);
                }
            }
			
			if (_private.cookie != undefined) {
				_private.cookie.setValue(this.getAccessToken().key + '|' + this.getAccessToken().secret + '|' + this.getOAuthVerifier());
			}
        }
		this.authorize();
        
        return this;
    };
    
    /**
     * @param {String}
     *            display_name
     */
	this.setDisplayName = function (display_name) {
		_private.xoauth_displayname = display_name;
	};
	
	/**
     * @return {String} xoauth_displayname
     */
	this.getDisplayName = function () {
		return _private.xoauth_displayname;
	};
	
	this.getSignedRequest = function (options) {
		var header_params = this.getAuthorizationHeaderParameters();
        
		if (options instanceof OAuthRequest) {
			var request = options;
		} else {
			var request = new OAuthRequest({
				method: options.method, 
				url: options.url,
				query: options.query,
				authorization_header_params: header_params
			});
		}
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.getConsumerToken().secret, this.getAccessToken().secret
        );
		
		request.setAuthorizationHeaderParam('oauth_signature', signature);
		
		request.setRequestHeader('Authorization', 'OAuth ' + request.toHeaderString());
		
		return request;
	};
	
	this.authenticatedRequest = function(url, method, query, callback) {
        if (_private.debug) {
            netscape.security.PrivilegeManager
                    .enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
        
        var header_params = this.getAuthorizationHeaderParameters();
        
        var request = new OAuthRequest({
            method : method,
            url : url,
            query : query,
            authorization_header_params : header_params
        });
        
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]()
                .sign(request, this.getConsumerToken().secret, this
                        .getAccessToken().secret);
        
        request.setAuthorizationHeaderParam('oauth_signature', signature);
        
        var header_string = 'OAuth ' + request.toHeaderString();
        
        var xhr = new XMLHttpRequest();
        xhr.open(request.getMethod(), request.getUrl(), false);
        xhr.setRequestHeader('Authorization', header_string);
        
        xhr.onreadystatechange = function (event) {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                callback(xhr);
            }
        };
        
        xhr.send(request.toQueryString());
    };
	
	// Hooks
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onInitialized = function (options) {
		var self = this;
		var mask = document.createElement('div'), dom_string = ''; 
		mask.setAttribute('id', 'mask');
		document.body.appendChild(mask);
		
        // display a popup to request login
		dom_string += '<div id="login" class="popup">';
		dom_string += '<p>When you click the button below, a browser window will open ';
		dom_string += 'where you can login and authorize this application.</p>';
		dom_string += '<input id="oauth-authorize-submit" type="button" value="Login and Authorize">';
		dom_string += '</div>';
		
        mask.innerHTML = dom_string;
		var button = document.getElementById('oauth-authorize-submit');
		button.onclick = function (event) {
			self.authorize();
		};
	};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onBeforeAuthorize         = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onAuthorization = function (options) {
        var self = this;
        var mask = document.getElementById('mask'), dom_string = ''; 
        mask.removeChild(mask.firstChild);
        
        // display a popup to request login
        dom_string += '<div id="start-app" class="popup">';
        dom_string += '<p>Once you have logged in and authorized this ';
        dom_string += 'application with your browser, please enter the provided ';
        dom_string += 'code and click the button below.</p>';
        dom_string += '<input id="verification" type="text" placeholder="enter code">';
        dom_string += '<input id="oauth-authorize-submit" type="button" value="Start application">';
        dom_string += '</div>';
        
        mask.innerHTML = dom_string;
        document.getElementById('oauth-authorize-submit').onclick = function(){
             var code = document.getElementById('verification').value;
             self.setOAuthVerifier(code);
             self.fetchAccessToken();
        };
		
		window.open(options.url);
    };
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onDeauthorization         = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onAuthorized              = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onDeauthorized            = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onRequestTokenSuccess     = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onRequestTokenFailure     = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onAccessTokenSuccess      = function (options) {/* stub */};
	
	/**
     * 
     * @param {Object|undefined}
     *            options
     */
	this.onAccessTokenFailure      = function (options) {/* stub */};
    
    if (arguments.length > 0) {
        this.init(options);
    }
}


OAuthConsumer.signatureMethods = {};
