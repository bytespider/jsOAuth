function OAuthUtilities() {}

OAuthUtilities.urlEncode = function(string){
    var reserved_chars = / |!|\*|"|'|\(|\)|;|:|@|&|=|\+|\$|,|\/|\?|%|#|\[|\]|<|>|{|}|\||\\|`|\^/, 
        str_len = string.length, i, string_arr = string.split('');
                          
    for (i = 0; i < str_len; i++) {
        if (string_arr[i].match(reserved_chars)) {
            string_arr[i] = '%' + (string_arr[i].charCodeAt(0)).toString(16).toUpperCase();
        }
    }

    return string_arr.join('');
};
