    /** @const */ var OAUTH_VERSION = '1.0';
    
    /**
     * OAuth
     * @constructor
     */
    function OAuth(options) {
	if (window === this) {
	    return new OAuth(options);
	}
	
	return this.init(options);
    }
    
    OAuth.prototype = {
	init: function (options) {
	    var oauth = {
		debug: options.debug || false,
		consumerKey: options.consumerKey,
		consumerSecret: options.consumerSecret,
		accessTokenSecret: options.accessTokenSecret || '',
		signatureMethod: options.signatureMethod || 'HMAC-SHA1'
	    };
	    
	    this.request = function (options) {
		var method, url, data, headers, success, failure, xhr, i,
		    headerParams, signatureMethod, signatureString, signature,
		    query;
		
		method = options.method || 'GET';
		url = options.url;
		data = options.data || {};
		headers = options.headers || {};
		success = options.success || function (data) {};
		failure = options.failure || function () {};
		
		if (oauth.debug) {
		    netscape.security.PrivilegeManager
			    .enablePrivilege("UniversalBrowserRead UniversalBrowserWrite");
		}
		
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
		    if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			success(xhr.responseText);
		    } else if(xhr.readyState == 4 && xhr.status != 200 && xhr.status != 0) {
			failure();
		    }
		};
		
		
		for(i in data) {
		    query.push(i + '=' + data[i]);
		}
		
		headerParams = {
		    'oauth_callback': 'oob',
		    'oauth_consumer_key': oauth.consumerKey,
		    'oauth_token': oauth.accessTokenSecret,
		    'oauth_signature_method': oauth.signatureMethod,
		    'oauth_timestamp': getTimestamp(),
		    'oauth_nonce': getNonce(),
		    'oauth_verifier': oauth.verifier || '',
		    'oauth_version': OAUTH_VERSION
		};
		
		signatureMethod = oauth.signatureMethod;
		signatureString = toSignatureBaseString(method, url, headerParams, query);
		signature = OAuth['signatureMethod'][signatureMethod](oauth.consumerSecret, oauth.accessTokenSecret, signatureString);
		
		headerParams.oauth_signature = signature;
		
		query = query.join('&');
		if(method == 'GET') {
		    if (query) {
			url += '?' + query;
		    }
		    query = null;
		} else {
		    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		
		xhr.open(method, url, true);
		
		xhr.setRequestHeader('Authorization', 'OAuth ' + toHeaderString(headerParams));
		xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
		for (i in headers) {
		    xhr.setRequestHeader(i, headers[i]);
		}
		
		xhr.send(query);
	    }
	},
	
	authenticate: function (options) {},
	deauthenticate: function (options) {},
	
	request: '',
	
	get: function (url, success, failure) {
	    this.request({'url': url, 'success': success, 'failure': failure});
	},
	post: function (url, success, failure) {
	    this.request({'method': 'POST', 'url': url, 'success': success, 'failure': failure});
	},
	getJSON: function (url, success, failure) {
	    this.get(url, function (json) {
		success(JSON.parse(json));
	    } , failure);
	},
	getXML: function (url, success, failure) {/* noop */}
    };
    
    OAuth.signatureMethod = {
	'HMAC-SHA1': function (consumer_secret, token_secret, signature_base) {
	    var passphrase, signature;
	    
	    consumer_secret = OAuth.urlEncode(consumer_secret);
	    token_secret = OAuth.urlEncode(token_secret || '');
	    
	    passphrase = consumer_secret + '&' + token_secret;
	    signature = HMAC(SHA1(), passphrase, signature_base);
	    
	    return btoa(signature);
	}
    };
    
    function toHeaderString(params) {
	var arr = [], i;
	for (i in params) {
            if (params[i] && params[i] != undefined && params[i] != '') {
		arr.push(i + '="' + OAuth.urlEncode(params[i]) + '"');
            }
	}
		
	return arr.join(', ');
    }
    
    function toSignatureBaseString(method, url, header_parms, query_params) {
	var arr = [], i;
		
	for (i in header_parms) {
	    if (header_parms[i] && header_parms[i] != undefined) {
		arr.push(OAuth.urlEncode(i) + '=' + OAuth.urlEncode(header_parms[i]+''));
	    }
	}
	for (i in query_params) {
	    if (query_params[i] && query_params[i] != undefined) {
		if (!oauth_header_params[i]) {
		    arr.push(OAuth.urlEncode(i) + '=' + OAuth.urlEncode(query_params[i]+''));
		}
	    }
	}
		
        return [
            method, 
            OAuth.urlEncode(url), 
            OAuth.urlEncode(arr.sort().join('&'))
        ].join('&');
    }
    
    function getTimestamp() {
        return parseInt(+new Date / 1000, 10); // use short form of getting a timestamp
    };
    
    function getNonce(key_length) {
        key_length = key_length || 64;
        
        var key_bytes = key_length / 8, value = '', key_iter = key_bytes / 4,
	    key_remainder = key_bytes % 4, i,
	    chars = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
                     '2A', '2B', '2C', '2D', '2E', '2F', '30', '31', '32', '33', 
                     '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D', 
                     '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47', 
                     '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', 
                     '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B', 
                     '5C', '5D', '5E', '5F', '60', '61', '62', '63', '64', '65', 
                     '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F', 
                     '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', 
                     '7A', '7B', '7C', '7D', '7E'];
        
        for (i = 0; i < key_iter; i++) {
            value += chars[rand()] + chars[rand()] + chars[rand()]+ chars[rand()];
        }
        
        // handle remaing bytes
        for (i = 0; i < key_remainder; i++) {
            value += chars[rand()];
        }
	
	function rand() {
	    return Math.floor(Math.random() * chars.length);
	}
	
	return value;
    };
    
    OAuth.urlEncode = function (string) {
	if (!string) return '';
	
	string = string + '';
	var reserved_chars = / |!|\*|"|'|\(|\)|;|:|@|&|=|\+|\$|,|\/|\?|%|#|\[|\]|<|>|{|}|\||\\|`|\^/, 
        str_len = string.length, i, string_arr = string.split('');
                          
	for (i = 0; i < str_len; i++) {
	    if (string_arr[i].match(reserved_chars)) {
		string_arr[i] = '%' + (string_arr[i].charCodeAt(0)).toString(16).toUpperCase();
	    }
	}
    
	return string_arr.join('');
    };

    OAuth.urlDecode = function (string){
	if (!string) return '';
    
	return string.replace(/%[a-fA-F0-9]{2}/ig, function (match) {
	    return String.fromCharCode(parseInt(match.replace('%', ''), 16));
	});
    };