function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(request, consumer, token){
	
		var consumer_secret = OAuthUtilities.urlEncode(consumer.secret);
		var token_secret = token ? OAuthUtilities.urlEncode(token.secret) : '';

		var signature_base = request.toSignatureBaseString();
        var signature = Crypto.HMAC(Crypto.SHA1, signature_base, consumer_secret + '&' + token_secret, {asString: true});
		
        return btoa(signature);
    };
    
    this.blocksize = 64;
    this.hash = function (message) {/*stub*/}
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;

