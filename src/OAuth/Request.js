    /**
     * Factory object for XMLHttpRequest
     */
    function Request() {
        var XHR;


        if (typeof global.Titanium !== 'undefined' && typeof global.Titanium.Network.createHTTPClient != 'undefined') {
            XHR = global.Titanium.Network.createHTTPClient();
        } else if (typeof require !== 'undefined') {
            // CommonJS require
            XHR = new require("xhr").XMLHttpRequest();
        } else {
            // W3C
            XHR = new global.XMLHttpRequest();
        }

        return XHR;
    }
