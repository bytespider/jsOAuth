function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(consumer_secret, token_secret){
        var signature = [];
        return signature.join('&');
    };
    
    this.blocksize = 64;
    this.hash = function (message) {/*stub*/}
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;

