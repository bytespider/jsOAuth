function OAuthSignatureMethod() {
    this.name = '';
    this.toString = function() {
        return this.name;
    };
    this.sign = function(){};
}