function OAuthConsumer(options) {
    if (arguments.length > 0) {
        this.init(options);
    }
    
    this.init = function(options) {
        // default to using cookies
        options.use_cookies = options.use_cookies || true;
        
        this.debug = options.debug == false ? false : true;
        this.key = options.key || '';
        this.secret = options.secret || '';
        this.callback_url = options.callback_url || 'oob';
        this.token = options.token || '';
        this.token_secret = options.token_secret || '';
        this.use_cookies = options.use_cookies;
        this.oauth_verifier = options.oauth_verifier || '';
        this.cookie;
        
        if (options.use_cookies) {
            this.cookie = new OAuthCookie('oauth_token');
            var values = this.cookie.getValue().split('|');
            if (values) {
                this.token = values[0];
                this.token_secret = values[1];
            }
        }
    };
    
    this.getRequestToken = function(){
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.requestTokenUrl, false);
        xhr.setRequestHeader('Authorization', this.getHeaderString());
        xhr.send(this.getRequestString());
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            // oauth_token=hh5s93j4hdidpola&oauth_token_secret=hdhd0244k9j7ao03&
            var token_string_params = xhr.responseText.split('&');
            for (var i = 0; i < token_string_params.length; i++) {
                var param = token_string_params[i].split('=');
                if (param[0] == 'oauth_token') {
                    this.token = param[1];
                }
                if (param[0] == 'oauth_token_secret') {
                    this.token_secret = param[1];
                }
            }
            //this.cookie.setValue(this.token + '|' + this.token_secret);
        }
        
        return this;
    };

    this.authorizeToken = function(){
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
        
        return this.authorizationUrl + '?' + this.getRequestString();
    };
    
    this.getAccessToken = function(){
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.accessTokenUrl, false);
        xhr.setRequestHeader('Authorization', this.getHeaderString());
        xhr.send(this.getRequestString());
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            // oauth_token=hh5s93j4hdidpola&oauth_token_secret=hdhd0244k9j7ao03&
            var token_string_params = xhr.responseText.split('&');
            for (var i = 0; i < token_string_params.length; i++) {
                var param = token_string_params[i].split('=');
                if (param[0] == 'oauth_token') {
                    this.token = param[1];
                }
                if (param[0] == 'oauth_token_secret') {
                    this.token_secret = param[1];
                }
            }
            
            this.cookie.setValue(this.token + '|' + this.token_secret);
        }
        
        return this;
    };
    
    this.getHeaderString = function() {
        var header = [];
        var params = {
            'realm': this.realm,
            'oauth_callback': this.callback_url,
            'oauth_consumer_key': this.key,
            'oauth_token': this.token,
            'oauth_signature_method': this.signature_method,
            'oauth_timestamp': this.getTimestamp(),
            'oauth_nonce': this.getNonce(),
            'oauth_verifier': this.oauth_verifier,
            'oauth_signature': (
                new OAuthConsumer.signatureMethods[this.signature_method]
             ).sign(this.secret, this.token_secret),
            'oauth_version': VERSION
        };
        
        var OU = OAuthUtilities;
        for (var i in params) {
            if (params.hasOwnProperty(i) && params[i]) {
                header.push(OU.urlEncode(i) + '="' + OU.urlEncode(params[i]) + '"');
            }
        }
        
        return 'OAuth ' + header.join(',');
    };
    
    this.getRequestString = function() {
        var request = [];
        var params = {
            'oauth_callback': this.callback_url,
            'oauth_consumer_key': this.key,
            'oauth_token': this.token,
            'oauth_signature_method': this.signature_method,
            'oauth_timestamp': this.getTimestamp(),
            'oauth_nonce': this.getNonce(),
            'oauth_verifier': this.oauth_verifier,
            'oauth_signature': (
                new OAuthConsumer.signatureMethods[this.signature_method]
             ).sign(this.secret, this.token_secret),
            'oauth_version': VERSION
        };
        
        var OU = OAuthUtilities;
        for (var i in params) {
            if (params.hasOwnProperty(i) && params[i]) {
                request.push(OU.urlEncode(i) + '=' + OU.urlEncode(params[i]));
            }
        }
        
        return request.join('&');
    };
    
    this.getTimestamp = function() {
        return parseInt((new Date).getTime() / 1000) + '';
    };
    
    this.getNonce = function(key_length){
        key_length = key_length || 64;
        
        var key_bytes = key_length / 8;
        var value = '';
        var key_iter = key_bytes / 4;
        var key_remainder = key_bytes % 4;
        var chars = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
                     '2A', '2B', '2C', '2D', '2E', '2F', '30', '31', '32', '33', 
                     '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D', 
                     '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47', 
                     '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', 
                     '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B', 
                     '5C', '5D', '5E', '5F', '60', '61', '62', '63', '64', '65', 
                     '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F', 
                     '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', 
                     '7A', '7B', '7C', '7D', '7E'];
        
        for (var i = 0; i < key_iter; i++) {
            value += chars[rand()] + chars[rand()] + chars[rand()]+ chars[rand()];
        }
        
        // handle remaing bytes
        for (var i = 0; i < key_remainder; i++) {
            value += chars[rand()];
        }
        
        return value;
        
        function rand() {
            return Math.floor(Math.random() * chars.length);
        }
    };
}


OAuthConsumer.signatureMethods = {};
