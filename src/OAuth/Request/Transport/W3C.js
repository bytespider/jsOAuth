
OAuthRequest.Transports = OAuthRequest.Transports || {};
OAuthRequest.Transports.W3C = {
    test: !!XMLHttpRequest,
    factory: function () { return new XMLHttpRequest; }
};