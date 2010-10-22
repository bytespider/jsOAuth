function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(request, consumer_secret, token_secret){
	
		var consumer_secret = OAuthUtilities.urlEncode(consumer_secret);
		var token_secret = OAuthUtilities.urlEncode(token_secret || '');
        var passphrase = consumer_secret + '&' + token_secret;

		var signature_base = request.toSignatureBaseString();
		
        var crypto = new OAuthCryptoSHA1();
        var signature = crypto.HMAC(consumer_secret + '&' + token_secret, signature_base);
        //console.log(signature);
        
        var signature = Crypto.HMAC(Crypto.SHA1, signature_base, consumer_secret + '&' + token_secret, {asString: true});
        console.log(signature);
        
		
        return btoa(signature);
    };
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;

