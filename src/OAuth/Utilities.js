function OAuthUtilities() {}

OAuthUtilities.urlEncode = function(string){
	if (!string) return string;
	
    var reserved_chars = / |!|\*|"|'|\(|\)|;|:|@|&|=|\+|\$|,|\/|\?|%|#|\[|\]|<|>|{|}|\||\\|`|\^/, 
        str_len = string.length, i, string_arr = string.split('');
                          
    for (i = 0; i < str_len; i++) {
        if (string_arr[i].match(reserved_chars)) {
            string_arr[i] = '%' + (string_arr[i].charCodeAt(0)).toString(16).toUpperCase();
        }
    }

    return string_arr.join('');
};

OAuthUtilities.urlDecode = function(string){
	if (!string) return string;
                          
    return string.replace(/%[a-fA-F0-9]{2}/ig, function (match) {
		return String.fromCharCode(parseInt(match.replace('%', ''), 16));
	});
};

OAuthUtilities.toByteString = function(str) {
    return str.replace(/./g, function(s){
        return s.charCodeAt(0).toString(16);
    });
}

