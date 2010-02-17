function OAuthRequest(options) {
    if (arguments.length > 0) {
        this.init(options);
    }
	
	this.init = function(options) {
		this.method = options.method.toUpperCase() | 'GET';
		this.url = options.url;
		if (query in options && typeof options.query == 'string') {
			// turn into an object
			var query = options.query.split('&');
			options.query = {}; // reset
			for (var i = 0; i < query.length; i++) {
				var kv = query.split('=');
				options.query[kv[0]] = kv[1];
			}
		}
		this.query = options.query | {};
	};
	
	this.toString = function () {
		var arr = [];
		for (i in this.query) {
			arr.push(OAuthUtilities.urlEncode(i) + '=' + OAuthUtilities.urlEncode(this.query[i]));
		}
		
		return arr.join('&');
	};
}