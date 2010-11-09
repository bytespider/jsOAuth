
(function (global) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /**
     * Base64 encode a string
     * @param string {string} the string to be base64 encoded
     */
    global.btoa = global.btoa || function (string) {
        var i = 0, length = string.length, ascii, index, output = '';

        for (; i < length; i+=3) {
            ascii = [
                string.charCodeAt(i),
                string.charCodeAt(i+1),
                string.charCodeAt(i+2)
            ];

            index = [
                ascii[0] >> 2,
                ((ascii[0] & 3) << 4) | ascii[1] >> 4,
                ((ascii[1] & 15) << 2) | ascii[2] >> 6,
                ascii[2] & 63
            ];

            if (isNaN(ascii[1])) {
                index[2] = 64;
            }
            if (isNaN(ascii[2])) {
                index[3] = 64;
            }

            output += b64[index[0]] + b64[index[1]] + b64[index[2]] +b64[index[3]];
        }

        return output;
    };
})(this);
