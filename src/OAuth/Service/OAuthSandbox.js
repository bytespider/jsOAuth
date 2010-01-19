function OAuthServiceOAuthSandbox(key, secret, token, token_secret) {
    var parent = OAuthServiceOAuthSandbox.prototype;
    
    if (arguments.length > 0) {
        this.init(key, secret, token, token_secret);
    }

    this.realm = 'http://oauth-sandbox.sevengoslings.net/';
    this.requestTokenUrl = this.realm + 'request_token';
    this.authorizationUrl = this.realm + 'authorize';
    this.accessTokenUrl = this.realm + 'access_token';
    
    this.twoLegged = function() {
        var url = 'http://oauth-sandbox.sevengoslings.net/two_legged';
        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
        
        // create a header
        var request_params = {
            //'oauth_callback': this.callback_url,
            'oauth_consumer_key': this.key,
            'oauth_token': this.token,
            'oauth_signature_method': SIGNATURE_METHOD,
            'oauth_timestamp': this.getTimestamp(),
            'oauth_nonce': this.getNonce(),
            //'oauth_verifier': oauth_verifier,
            'oauth_signature': (
                new OAuthConsumer.signatureMethods[SIGNATURE_METHOD]
             ).sign(this.secret, this.token_secret),
            'oauth_version': VERSION
        };
        var request_header = [];
        var request = [];
        var header = '';
        var xhr;

        for (var i in request_params) {
            if (request_params.hasOwnProperty(i)) {
                request_header.push(OAuthUtilities.urlEncode(i) + '="' 
                    + OAuthUtilities.urlEncode(request_params[i]) + '"');
                request.push(OAuthUtilities.urlEncode(i) + '=' 
                    + OAuthUtilities.urlEncode(request_params[i]));
            }
        }
        
        header = 'OAuth realm="' + this.realm + '",' + request_header.join(',');
        url += '?' + request.join('&');
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader('Authorization', header);
        xhr.send(null);
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            alert(xhr.responseText);
        }
    }
    this.threeLegged = function() {
        var url = 'http://oauth-sandbox.sevengoslings.net/three_legged';
        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
        
        // create a header
        var request_params = {
            //'oauth_callback': this.callback_url,
            'oauth_consumer_key': this.key,
            'oauth_token': this.token,
            'oauth_signature_method': SIGNATURE_METHOD,
            'oauth_timestamp': this.getTimestamp(),
            'oauth_nonce': this.getNonce(),
            //'oauth_verifier': oauth_verifier,
            'oauth_signature': (
                new OAuthConsumer.signatureMethods[SIGNATURE_METHOD]
             ).sign(this.secret, this.token_secret),
            'oauth_version': VERSION
        };
        var request_header = [];
        var request = [];
        var header = '';
        var xhr;

        for (var i in request_params) {
            if (request_params.hasOwnProperty(i)) {
                request_header.push(OAuthUtilities.urlEncode(i) + '="' 
                    + OAuthUtilities.urlEncode(request_params[i]) + '"');
                request.push(OAuthUtilities.urlEncode(i) + '=' 
                    + OAuthUtilities.urlEncode(request_params[i]));
            }
        }
        
        header = 'OAuth realm="' + this.realm + '",' + request_header.join(',');
        url += '?' + request.join('&');
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader('Authorization', header);
        xhr.send(null);
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            alert(xhr.responseText);
        }
    }
    
    this.init = function(key, secret, token, token_secret) {
        parent.init.apply(this, arguments);
    }
    
}

OAuthServiceOAuthSandbox.prototype = new OAuthService();
