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

        message = OAuthUtilities.toByteString(message);
        message += '80';

        var bit_length = message.length * 4;
        var bit_length_hex = parseInt(bit_length, 16);
        var bit_length_hex_length = (bit_length_hex + '').length;
        
        var last_64_bit_hex = new Array(17 - bit_length_hex_length).join(0) + bit_length_hex;
        var pad_l = 512 - ((bit_length + 64) % 512);
        alert(pad_l);
        var pad = new Array(1 + pad_l).join(0);
        
        message += pad + last_64_bit_hex;
        alert(message.length * 4);
    }
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;

