
function OAuthCrypto() {}

OAuthCrypto.prototype = {
    /**
     *
     * @param key string
     * @param message string
     */
    HMAC: function (key, message) {
        var k = OAuthCrypto.stringToByteArray(key);
        var m = OAuthCrypto.stringToByteArray(message);
        
        var l = k.length;
        
        if (l > this.blocksize) {
            k = this.hash(k);
            l = k.length;
        }
        
        k = k.concat(OAuthCrypto.zeroPad(this.blocksize - l));
        
        var oPad = k.slice(0); // copy
        var iPad = k.slice(0); // copy       
        
        for (var i = 0; i < this.blocksize; i++) {
            oPad[i] ^= 0x5C;
            iPad[i] ^= 0x36;            
        }
        
        var byteArray = this.hash(oPad.concat(this.hash(iPad.concat(m))));
        return OAuthCrypto.byteArrayToString(byteArray);
    },
    hash: null,
    blocksize: null
};

OAuthCrypto.zeroPad = function (length) {
    return new Array(length + 1).join(0).split('');
};

OAuthCrypto.stringToByteArray = function (str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        var w = (c >>> 24);
        var x = (c >>> 16);
        var y = (c >>> 8);
        var z = c & 0xFF;
        if (w > 0) {bytes.push(w);}
        if (x > 0) {bytes.push(x);}
        if (y > 0) {bytes.push(y);}
        if (z > 0) {bytes.push(z);}
    }
    return bytes;
};

OAuthCrypto.wordsToByteArray = function (words) {
    var bytes = [];
    for (var b = 0; b < words.length * 32; b += 8) {
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
    }
    return bytes;
};

OAuthCrypto.byteArrayToHex = function (byteArray) {
    var hex = [];
    var l = byteArray.length;
    for (var i = 0; i < l; i++) {
        hex.push((byteArray[i] >>> 4).toString(16));
        hex.push((byteArray[i] & 0xF).toString(16));
    }
    return hex.join('');
};

OAuthCrypto.byteArrayToString = function (byteArray) {
    var string = '';
    var l = byteArray.length;
    for (var i = 0; i < l; i++) {
        string += String.fromCharCode(byteArray[i]);
    }
    return string;
};

OAuthCrypto.leftrotate = function (value, shift) {
    return (value << shift) | (value >>> (32 - shift));
};

JS.OAuthCrypto = OAuthCrypto;