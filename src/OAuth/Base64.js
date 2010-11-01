(function (global) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // add Base64 encode, but only if we need it
	global.btoa = global.btoa || function (string) {
        var i, len = string.length, byte1, byte2, byte3,
            en1, en2, en3, en4, output;

        for (i = 0; i < len; i+=3) {
            byte1 = string.charCodeAt(i);
			byte2 = string.charCodeAt(i+1);
			byte3 = string.charCodeAt(i+2);

            en1 = byte1 >> 2;
			en2 = ((byte1 & 3) << 4) | (byte2 >> 4);
			en3 = ((byte2 & 15) << 2) | (byte3 >> 6);
			en4 = byte3 & 63;

            if (isNaN(byte2)) {
				encode3 = encode4 = 64;
			} else if (isNaN(byte3)) {
				encode4 = 64;
			}

            output += b64.charAt(en1) + b64.charAt(en2) + b64.charAt(en3) + b64.charAt(en4);
        }

        return output
    };
})(this);
