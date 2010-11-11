	/**
	 * Factory object for XMLHttpRequest
	 */
	function Request() {
		// CommonJS require
		if (undefined != require) {
			var XMLHttpRequest = require("xhr").XMLHttpRequest;
		}

		return new XMLHttpRequest();
	}
