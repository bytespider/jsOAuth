function OAuthSignatureMethod() {
    this.toString = function() {
        return this.name;
    }
}

OAuthSignatureMethod.prototype = new OAuthSignatureMethodAbstract();
