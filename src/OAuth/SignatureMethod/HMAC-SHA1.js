function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(consumer_secret, token_secret){
        var signature = [];
        return signature.join('&');
    };
    
    var blocksize = 64;
    function hash(message) {
        
    }
    
    function HMAC(key, message) {
        if (key.length > blocksize) {
            key = hash(key);
        } else if (key.length < blocksize) {
            key = key + (new Array(blocksize - key.length)).join(0);
        }
        return hash(key ^ (0x5c * blocksize) + hash((0x36 * blocksize) + message));
    }
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;
