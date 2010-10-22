OAuthCryptoSHA1 = function (message) {
    if (arguments.length > 0) {
        var m = OAuthCrypto.stringToByteArray(message);
        var crypto = new OAuthCryptoSHA1();
        var digest = crypto.hash(m);
        return OAuthCrypto.byteArrayToHex(digest);
    }
};

OAuthCryptoSHA1.prototype = new OAuthCrypto();
OAuthCryptoSHA1.prototype.blocksize = 64;
OAuthCryptoSHA1.prototype.hash = function (m) {
    var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
    var K = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6];
    
    var l;
    
    if (m.constructor === String) {
        m = stringToByteArray(m);
    }
    
    l = m.length;
    
    var pad = (Math.ceil((l + 9) / this.blocksize) * this.blocksize) - (l + 9);
    
    var ml = [
        ((l * 8) << 24) & 0xFF,
        ((l * 8) << 16) & 0xFF,
        ((l * 8) << 8) & 0xFF,
        (l * 8) & 0xFF
    ];
    
    var ml = [0, 0, 0, (l * 8)];
    
    m = m.concat([0x80], OAuthCrypto.zeroPad(pad), [0, 0, 0, 0], ml);

    var blocks = Math.ceil(m.length / this.blocksize);
    
    for (var b = 0; b < blocks; b++) {
        var block = m.slice(b * this.blocksize, (b+1) * this.blocksize);
        var bl = block.length;
        
        var w = [];
        
        for (var i = 0; i < bl; i++) {
            w[i >>> 2] |= block[i] << (24 - (i - ((i >> 2) * 4)) * 8);
        }
        
        var A = H[0];
        var B = H[1];
        var C = H[2];
        var D = H[3];
        var E = H[4];
        
        for (var t=0; t < 80; t++) {
            if (t >= 16) {
                w[t] = OAuthCrypto.leftrotate(w[t-3] ^ w[t-8] ^ w[t-14] ^ w[t-16], 1);
            }
            
            var n = Math.floor(t / 20);
            var TEMP = OAuthCrypto.leftrotate(A, 5) + fn(n, B, C, D) + E + K[n] + w[t];
            
            E = D;
            D = C;
            C = OAuthCrypto.leftrotate(B, 30);
            B = A;
            A = TEMP;
        }
        
        H[0] += A;
        H[1] += B;
        H[2] += C;
        H[3] += D;
        H[4] += E;
    }
    
    return OAuthCrypto.wordsToByteArray(H);
    
    function fn(t, B, C, D) {
        switch (t) {
            case 0: 
                return (B & C) | ((~B) & D);
            case 1: 
            case 3:
                return B ^ C ^ D;
            case 2: 
                return (B & C) | (B & D) | (C & D);
        }
    }
};

JS.OAuthCryptoSHA1 = OAuthCryptoSHA1;