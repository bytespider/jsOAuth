    /**
     * Factory object for XMLHttpRequest
     */
    function Request() {
        var XHR;


        if (typeof global.Titanium !== 'undefined' && typeof global.Titanium.Network.createHTTPClient != 'undefined') {
            XHR = global.Titanium.Network.createHTTPClient();
        } else if (typeof require !== 'undefined') {
            // CommonJS require
            try {
                XHR = new require("xhr").XMLHttpRequest();
            } catch (e) {
                // module didn't expose correct API or doesn't exists
                if (typeof global.XMLHttpRequest !== "undefined") {
                    XHR = new global.XMLHttpRequest();
                } else {
                    throw "No valid request transport found.";
                    return null;
                }
            }
        } else if (typeof global.XMLHttpRequest !== "undefined") {
            // W3C
            XHR = new global.XMLHttpRequest();
        } else {
            throw "No valid request transport found.";
            return null;
        }

        return XHR;
    }
