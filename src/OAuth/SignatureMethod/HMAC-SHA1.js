function OAuthSignatureMethodHMACSHA1() {
    this.name = 'HMAC-SHA1';
    this.sign = function(request, consumer_secret, token_secret){
	
		consumer_secret = OAuthUtilities.urlEncode(consumer_secret);
		token_secret = OAuthUtilities.urlEncode(token_secret || '');
        var passphrase = consumer_secret + '&' + token_secret;

		var signature_base = request.toSignatureBaseString();
		
        var crypto = new OAuthCryptoSHA1();
        var signature = crypto.HMAC(passphrase, signature_base);
        
        return btoa(signature);
    };
}

OAuthSignatureMethodHMACSHA1.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['HMAC-SHA1'] = OAuthSignatureMethodHMACSHA1;

JS.OAuthSignatureMethodHMACSHA1 = OAuthSignatureMethodHMACSHA1;