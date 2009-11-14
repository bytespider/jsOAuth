/**
 * Url
 * 
 * @constructor
 * @param {String} url
 */
Url = function (url) {
    var args = arguments, args_callee = args.callee, 
        parsed_url, scheme, host, port, path, query, anchor,
        parser = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/;
        
    if (!(this instanceof args_callee)) {
        return this.toString();
    }
    
    parsed_url = url.match(parser);
    
    scheme = parsed_url[1];
    host = parsed_url[2];
    port = parsed_url[3];
    path = parsed_url[4];
    query = parsed_url[5];
    anchor = parsed_url[6];
    
    scheme = (scheme ? scheme.replace('://', '').toLowerCase() : '');
    port = (port ? port.replace(':', '') : (scheme === 'https' ? '443' : '80'));
    // correct the scheme based on port number
    scheme = (scheme === '' && port === '443' ? 'https' : scheme);
    
    query = query ? query.replace('?', '') : '';
    anchor = anchor ? anchor.replace('#', '') : '';
    
    
    // Fix the host name to include port if non-standard ports were given
    if ((scheme === 'https' && port !== '443') || (scheme === 'http' && port !== '80')) {
        host = host + ':' + port;
        
    }
    
    this.scheme = scheme;
    this.host = host;
    this.port = port;
    this.path = path ? path : '/';
	this.query = new QueryString(query);
    this.anchor = anchor ? anchor : '';
    
    /**
     * Returns the url string
     * 
     * @memberOf Url
     * @return {String}
     */
    this.toString = function () {
        return scheme + '://' + this.host + this.path + (this.query ? '?' + this.query : '')  + (this.anchor ? '#' + this.anchor : '');
    };
};
QueryString = function () {
	var args = arguments, args_callee = args.callee, args_length = args.length;
    if (!(this instanceof args_callee)) {
        return this.toString();
    }
	
	this.queryParams = {};
	this.setQueryParams = function (query) {
        var args = arguments, args_length = args.length, i, query_array, 
            query_array_length, params = this.queryParams, key_value;
        if (args_length <= 1) {
            if (typeof query === 'object') {
                // iterate
                for (i in query) {
                    if (query.hasOwnProperty(i)) {
                        params[i] = query[i];
                    }
                }
            } else if (typeof query === 'string') {
                // split string on '&'
                query_array = query.spilt('&');
                // iterate over each of the array items
                for (i = 0, query_array_length = query_array.length; i < query_array_length; i++) {
                    // split on '=' to get key, value
                    key_value = query_array[i].split('=');
                    params[key_value[0]] = key_value[1];
                }
            }
        } else {
            for (i = 0; i < arg_length; i += 2) {
                // treat each arg as key, then value
                params[args[i]] = args[i+1];
            }
        }
		
		this.queryParams = params;
    };
	
    /**
     * Returns the url query string
     * 
     * @memberOf QueryString
     * @return {String}
     */
    this.toString = function () {
        var query = [], i, params = this.queryParams;
		for (i in params) {
			if (params.hasOwnProperty(i)) {
				query.push(i + '=' + params[i]);
			}
		}
        return query.join('&');
    };
	
	if (args_length > 0) {
		this.setQueryParams(args);
	}
};

// Only give to the world if they want it
if (window.Url === undefined) {
	window.Url = Url;
}
