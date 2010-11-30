	/**
	 * Factory object for XMLHttpRequest
	 */
	function Request(debug) {
		var XMLHttpRequest;

		// CommonJS require
		if (typeof require != 'undefined') {
			XMLHttpRequest = new require("xhr").XMLHttpRequest();
		}

		if (typeof Titanium.Network.HTTPClient != 'undefined') {
			XMLHttpRequest = Titanium.Network.createHTTPClient();
		}

		if (typeof this.XMLHttpRequest != 'undefined') {
			XMLHttpRequest = new this.XMLHttpRequest();
		}

		return XMLHttpRequest;
	}
