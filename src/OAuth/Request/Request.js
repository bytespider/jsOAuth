
function OAuthRequest() {
    this.request = OAuthRequest.factory();
}

OAuthRequest.factory = function () {
    for (var transport in OAuthRequest.Transports)
    {
        if (OAuthRequest.Transports[transport].test === true)
        {
            return OAuthRequest.Transports[transport].factory();
        }
    }
};

OAuthRequest.prototype = {
    constructor: OAuthRequest,
    set onreadystatechange(handler) {
        this.request.onreadystatechange = handler;
    },
    get onreadystatechange() {
        return this.request.onreadystatechange;
    },
    set onerror(handler) {
        this.request.onerror = handler;
    },
    get onerror() {
        return this.request.onerror;
    },
    get readyState() {
        return this.request.readyState;
    },

    // request
    open: function (method, url, async, user, password) {
        var xhr = this.request;

        xhr.method = method;
        xhr.url = url;
        xhr.async = async;
        xhr.user = password;

        xhr.open(xhr.method, xhr.url, xhr.async, xhr.user, xhr.password);
    },
    setRequestHeader: function (header, value) {
        this.request.headers[header] = value;
        this.request.setRequestHeader(header, value);
    },
    send: function (data) {
        var xhr = this.request;

        xhr.send(data);
    },
    abort: function () {
        this.request.abort();
    },

    // response
    get status() {
        return this.request.status;
    },
    get statusText() {
        return this.request.statusText;
    },
    getResponseHeader: function (header) {
        this.request.getResponseHeader(header);
    },
    getAllResponseHeaders: function () {
        this.request.getAllResponseHeaders();
    },
    get responseText () {
        return this.request.responseText;
    },
    get responseXML () {
        return this.request.responseXML;
    },

    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4,

    addEventListener: function (type, handler, useCapture) {
        this.request.addEventListener(type, handler, useCapture);
    },
    removeEventListener: function (type, handler, useCapture) {
        this.request.removeEventListener(type, handler, useCapture);
    },
    dispatchEvent: function (event) {
        this.request.dispatchEvent(event);
    }
};