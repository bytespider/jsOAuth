function OAuthSignatureMethod() {
}

OAuthSignatureMethod.prototype = {
    name: null,
    sign: function () {},
    toString: function () {
        return this.name;
    }
};

JS.OAuthSignatureMethod = OAuthSignatureMethod;