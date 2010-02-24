/*
 @TODO:
    - Fix cookie storage
*/


/**
 * Core OAuth consumer client 
 * @constructor
 * 
 * @param {Object} options
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
	 * @param {Object|undefined} options
	 * 
	 */
    this.init = function (options) {
		_private.debug = 'debug' in options ? options.debug : _private.debug;
        _private.consumer_token = new OAuthToken(options.consumer_key, options.consumer_secret);
        _private.access_token = new OAuthToken(options.token_key, options.token_secret);

        _private.oauth_callback_url = options.callback_url || _private.oauth_callback_url;

        _private.oauth_verifier = options.oauth_verifier || '';
        _private.xoauth_displayname = options.displayname || '';
        
        this.onauthorized = options.onauthorized;
        
		
        _private.cookie = new OAuthCookie('oauth_token');
        var values = _private.cookie.getValue().split('|');
        if (values) {
            this.getAccessToken().set(values[0], values[1]);
            _private.oauth_verifier = values[2];
        }
    };
    
    /**
     * @method
     * @param {Object|undefined} options
     */
    this.authorize = function () {
        if (!(_private.access_token.key && _private.access_token.secret)) {
            // need to get a access token
            this.fetchRequestToken();
        }
        
        if (_private.access_token.key && _private.access_token.secret && !_private.oauth_verifier) {
            var self = this;
            var url = this.getAuthorizeTokenUrl();
            window.open(url);

            var mask = document.getElementById('mask') || document.createElement('div');
            mask.removeChild(document.getElementById('login'));
            mask.setAttribute('id', 'mask');

            var popup = document.createElement('div');
            mask.appendChild(popup);
            popup.setAttribute('id', 'start-app');
            popup.setAttribute('class', 'popup');

            var node;
            node = document.createElement('p');
            popup.appendChild(node);
            node.appendChild(document.createTextNode('Once you have logged in and authorized this application with your browser, please enter the provided code and click the button below.'));

            node = document.createElement('input');
            popup.appendChild(node);
            node.setAttribute('id', 'verification');
            node.setAttribute('type', 'text');
            node.setAttribute('placeholder', 'enter code');
            node.style.width = '308px';

            node = document.createElement('input');
            popup.appendChild(node);
            node.setAttribute('type', 'button');
            node.setAttribute('value', 'Start application');
            node.onclick = function () {
                var code = document.getElementById('verification').value;
                self.setOAuthVerifier(code);
                self.fetchAccessToken();
            };

            document.body.appendChild(mask);
            // force - but this is bad
            window.onload();
        }
        
        if(_private.access_token.key && _private.access_token.secret && _private.oauth_verifier) {
            document.body.removeChild(document.getElementById('mask'));
            this.onauthorized.call(this);
        }
    };
	
    /**
     * @method
     */
	this.deauthorize = function () {/*stub*/}
    
    /**
     * @method
     */
	this.getRequestParameters = function () {/*stub*/}
	
    /**
     * @method
     * @return {String} oauth_verifier
     */
	this.getOAuthVerifier = function () {return _private.oauth_verifier};
	
    /**
     * @method
     * @param {String} oauth_verifier
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
		
		var header_params = this.getAuthorizationHeaderParameters();
        
        var request = new OAuthRequest({
            method: 'POST', 
			url: this.requestTokenUrl, 
			query: this.getDefaultRequestParams(), 
			authorization_header_params: header_params
        });
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.getConsumerToken().secret, this.getAccessToken().secret
        );
		
		request.setAuthorizationHeaderParam('oauth_signature', signature);
		
		var header_string = 'OAuth ' + request.toHeaderString();

        var xhr = new XMLHttpRequest();
        xhr.open(request.getMethod(), request.getUrl(), false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', header_string);
        xhr.send(request.toQueryString());
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
    this.getAuthorizeTokenUrl= function () {
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
		
		var header_params = this.getAuthorizationHeaderParameters();
        
        var request = new OAuthRequest({
            method: 'POST', 
			url: this.accessTokenUrl,
			query: {oauth_verifier: _private.oauth_verifier},
			authorization_header_params: header_params
        });
		
        var signature = new OAuthConsumer.signatureMethods[this.signature_method]().sign(
            request, this.getConsumerToken().secret, this.getAccessToken().secret
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
     * @param {String} display_name
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
	
	
	// Hooks
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onInit                    = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onAuthorization           = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onDeauthorization         = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onAuthorized              = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onDeauthorized            = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onRequestTokenSuccess     = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onRequestTokenFailure     = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onAccessTokenSuccess      = function (options) {/*stub*/};
	
	/**
	 * 
	 * @param {Object|undefined} options
	 */
	this.onAccessTokenFailure      = function (options) {/*stub*/};
    
    if (arguments.length > 0) {
        this.init(options);
    }
}


OAuthConsumer.signatureMethods = {};
