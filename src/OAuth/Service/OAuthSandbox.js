var VERSION = '1.0';
var SIGNATURE_METHOD = 'PLAINTEXT';

function OAuthServiceOAuthSandbox(options) {
    var parent = OAuthServiceOAuthSandbox.prototype;
    
    if (arguments.length > 0) {
        this.init(options);
    }

    this.init = function(options) {
        parent.init.apply(this, arguments);
    };
    
    this.signature_method = 'PLAINTEXT'; 
    
    this.realm = 'http://oauth-sandbox.sevengoslings.net/';
    this.requestTokenUrl = this.realm + 'request_token';
    this.authorizationUrl = this.realm + 'authorize';
    this.accessTokenUrl = this.realm + 'access_token';
    
    this.twoLegged = function() {
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
        
        var url = 'http://oauth-sandbox.sevengoslings.net/two_legged';
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?' + this.getRequestString(), false);
        xhr.setRequestHeader('Authorization', this.getHeaderString());
        xhr.send(null);
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            alert(xhr.responseText);
        }
    };
    
    this.threeLegged = function() {
        if (this.debug) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
        }
        
        var url = 'http://oauth-sandbox.sevengoslings.net/three_legged';
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?' + this.getRequestString(), false);
        xhr.setRequestHeader('Authorization', this.getHeaderString());
        xhr.send(null);
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            alert(xhr.responseText);
        }
    };
}

OAuthServiceOAuthSandbox.prototype = new OAuthService();
