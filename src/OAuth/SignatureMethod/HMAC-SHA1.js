function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(consumer_secret, token_secret){
        this.hmac(consumer_secret, '');
        var signature = [];
        return signature.join('&');
    };
    
    this.blocksize = 64;
    this.hash = function (message) {
        var h0 = 0x67452301;
        var h1 = 0xEFCDAB89;
        var h2 = 0x98BADCFE;
        var h3 = 0x10325476;
        var h4 = 0xC3D2E1F0;

        message = message.split('');
        var bytes = message.length * 8;
        message[bytes >> 5] |= 0x80 << 24 - bytes % 32;
        message[(bytes + 64 >>> 9 << 4) + 15] = bytes;
        alert(message);
    }
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;
