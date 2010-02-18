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
		var keys = [];
        var values = [];
		for (var k in query_params) {
			keys.push(k);
		}

        var qp = query_params;
		query_params = {}; // reset
		keys.sort();
		
		for(var k = 0; k < keys.length; k++) {
			query_params[keys[k]] = qp[keys[k]];
		}
        
        return query_params;
    };
    
    this.setQueryParams = function(query_params_object) {
        query_params = query_params_object;
    };
    
    this.toString = function () {
		var arr = [], qp = this.getQueryParams();
		for (i in qp) {
				if (qp[i] && qp[i] != undefined) {
					arr.push(OAuthUtilities.urlEncode(i) + '=' + OAuthUtilities.urlEncode(qp[i]+''));
				}
		}
		
		return arr.join('&');
    };
	
	 this.toHeaderString = function () {
		var arr = [], qp = this.getQueryParams();
		for (i in qp) {
            if (qp[i] && qp[i] != undefined) {
				arr.push(i + '="' + OAuthUtilities.urlEncode(qp[i]) + '"');
            }
		}
		
		return arr.join(', ');
    };
	
    this.toSignatureBaseString = function () {
        var sbs = [
            method, 
            OAuthUtilities.urlEncode(url), 
            OAuthUtilities.urlEncode(this + '')
        ].join('&');
        console.log(sbs);
        return sbs;
    };
    
    
    if (arguments.length > 0) {
        this.init(options);
    }
}
