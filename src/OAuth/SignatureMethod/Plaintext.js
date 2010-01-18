function OAuthSignatureMethodPlaintext() {
    this.name = 'PLAINTEXT';
    this.sign = function(consumer_secret, token_secret){
        var signature = [];
        signature.push(OAuthUtilities.urlEncode(consumer_secret));
    
        if (token_secret) {
            signature.push(OAuthUtilities.urlEncode(token_secret));
        } else {
            signature.push('');
        }
    
        return signature.join('&');
    };
}

OAuthSignatureMethodPlaintext.prototype = new OAuthSignatureMethod();

OAuthConsumer.signatureMethods['PLAINTEXT'] = OAuthSignatureMethodPlaintext;
