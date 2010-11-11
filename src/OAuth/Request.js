	/**
	 * Factory object for XMLHttpRequest
	 */
	function Request(debug) {
		var XMLHttpRequest;

		// CommonJS require
		if (typeof require != 'undefined') {
			XMLHttpRequest = require("xhr").XMLHttpRequest;
		}
		if (typeof this.XMLHttpRequest != 'undefined') {
			XMLHttpRequest = this.XMLHttpRequest;
		}

		return new XMLHttpRequest();
	}
