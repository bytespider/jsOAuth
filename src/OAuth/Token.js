function OAuthToken(key, secret) {
    this.key = key;
    this.secret = secret;
    
    this.set = function (key, secret) {
        this.key = key;
        this.secret = secret;
    };
    
    this.toString = function () {
        alert(this);
    };
}