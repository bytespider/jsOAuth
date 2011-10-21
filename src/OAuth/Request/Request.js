
function OAuthRequest(transport) {
}

OAuthRequest.prototype = {
    constructor: OAuthRequest,
    onreadystatechange: "",
    onerror: "",
    readyState: OAuthRequest.UNSENT,

    // request
    open: function (method, url, async, user, password) {},
    setRequestHeader: function (header, value) {},
    send: function (data) {},
    abort: function () {},

    // response
    status: 0,
    statusText: "",
    getResponseHeader: function (header) {},
    getAllResponseHeaders: function () {},
    responseText: "",
    responseXML: "",
    addEventListener: function (type, handler, useCapture) {}.
    removeEventListener: function (type, handler, useCapture) {},
    dispatchEvent: function (event) {}
};

OAuthRequest.UNSENT = 0;
OAuthRequest.OPENED = 1;
OAuthRequest.HEADERS_RECEIVED = 2;
OAuthRequest.LOADING = 3;
OAuthRequest.DONE = 4;