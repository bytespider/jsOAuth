	/**
	 * Factory object for XMLHttpRequest
	 */
	function Request(debug) {
		var XMLHttpRequest;


		switch (true)
		{
			case typeof global.Titanium.Network.createHTTPClient != 'undefined':
				XMLHttpRequest = global.Titanium.Network.createHTTPClient();
				break;

			// CommonJS require
			case typeof require != 'undefined':
				XMLHttpRequest = new require("xhr").XMLHttpRequest();
				break;

			case typeof global.XMLHttpRequest != 'undefined':
				XMLHttpRequest = new global.XMLHttpRequest();
				break;
		}

		return XMLHttpRequest;
	}
