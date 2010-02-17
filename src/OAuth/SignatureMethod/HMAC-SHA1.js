function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(request, consumer_secret, token_secret){

        hmacString = Crypto.HMAC(Crypto.SHA1, "Message", "Secret Passphrase", { asString: true });
        var signature = [];
        return signature.join('&');
    };
    
    this.blocksize = 64;
    this.hash = function (message) {/*stub*/}
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;

