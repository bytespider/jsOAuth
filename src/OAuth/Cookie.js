function OAuthCookie(name, expires, path) {
    var cookie_name = name;
    
    var cookie_date = new Date();
    // three months
    cookie_date.setTime(cookie_date.getTime() + 7889231);
    
    var cookie_expires = expires || cookie_date.toGMTString();
    var cookie_path = path || '/';
    
    var cookie_value = null;
    
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    if (results) {
        cookie_value = unescape(results[2]);
    }
    
    this.setValue = function(value) {
        var cookie = cookie_name + '=' + escape(value) + '; ';
        cookie += 'expires=' + cookie_expires + '; ';
        cookie += 'path=' + cookie_path + '; ';
        document.cookie = cookie;
        
        cookie_value = value;
    };
    
    this.getValue = function() {
        return cookie_value;
    };
    
    this.destroy = function() {
        document.cookie = cookie_name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + cookie_path + ";";
    };
    
    return this;
}
