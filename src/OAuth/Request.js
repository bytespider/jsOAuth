function OAuthRequest(options) {
    var method = 'GET', url, query_params;
    
    this.init = function (options) {
    	this.setMethod(options.method);
    	this.setUrl(options.url);
    	if (query in options && typeof options.query == 'string') {
            // turn into an object
            var query = options.query.split('&');
            options.query = {}; // reset
            for (var i = 0; i < query.length; i++) {
                var kv = query.split('=');
                options.query[kv[0]] = kv[1];
            }
        }
    	query_params = options.query || {};
    };
    
    this.getMethod = function() {
        return method;
    };
    
    this.setMethod = function(method_string) {
        method = method_string.toUpperCase() || 'GET';
    };
    
    this.getUrl = function() {
        return url;
    };
    
    this.setUrl = function(url_string) {
        // @TODO: add url normalization here NS should have
        url = url_string;
    };
    
    this.getQueryParam = function(key) {
        return query_params[key] | undefined;
    };
    
    this.setQueryParam = function(key, value) {
        query_params[key] = value;
    };
    
    this.getQueryParams = function() {
        return query_params;
    };
    
    this.setQueryParams = function(query_params_object) {
        query_params = query_params_object;
    };
    
    this.toString = function () {
	var arr = [];
	for (i in query_params) {
            arr.push(OAuthUtilities.urlEncode(i) + '=' + OAuthUtilities.urlEncode(this.query[i])+'');
	}
	
	return arr.join('&');
    };

    this.toSignatureBaseString = function () {
        var arr = [
            method, 
            OAuthUtilities.urlEncode(url), 
            OAuthUtilities.urlEncode(this + '')
        ];
        
        return arr.join('&');
    };
    
    
    if (arguments.length > 0) {
        this.init(options);
    }
}
