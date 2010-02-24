function OAuthSignatureMethodPlaintext() {
    this.name = 'PLAINTEXT';
    this.sign = function(request, consumer_secret, token_secret){
		var consumer_secret = OAuthUtilities.urlEncode(consumer_secret);
		var token_secret = OAuthUtilities.urlEncode(token_secret || '');
        var passphrase = consumer_secret + '&' + token_secret;
    
        return passphrase;
    };
}

OAuthSignatureMethodPlaintext.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['PLAINTEXT'] = OAuthSignatureMethodPlaintext;
