	/**
	 * Factory object for XMLHttpRequest
	 */
	function Request(debug) {
		var XHR;


		switch (true)
		{
			case typeof global.Titanium != 'undefined' && typeof global.Titanium.Network.createHTTPClient != 'undefined':
				XHR = global.Titanium.Network.createHTTPClient();
				break;

			// CommonJS require
			case typeof require != 'undefined':
				XHR = new require("xhr").XMLHttpRequest();
				break;

			case typeof global.XMLHttpRequest != 'undefined':
				XHR = new global.XMLHttpRequest();
				break;
		}

		return XHR;
	}
