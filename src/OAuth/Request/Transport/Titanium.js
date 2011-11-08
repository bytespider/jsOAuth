define(["request"], function (OAuthRequest) {
    OAuthRequest.Transports = OAuthRequest.Transports || {};
    OAuthRequest.Transports.Titanium = {
        test: !!Titanium && !!Titanium.Network.HTTPClient,
        factory: function () { return new Titanium.Network.HTTPClient; }
    };
});