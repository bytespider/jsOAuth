define(["request"], function (OAuthRequest) {
    OAuthRequest.Transports = OAuthRequest.Transports || {};
    OAuthRequest.Transports.CommonJS = {
        test: !!require("xhr").XMLHttpRequest,
        factory: function () { return new require("xhr").XMLHttpRequest; }
    };
});