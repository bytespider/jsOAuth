	/**
	 * Factory object for XMLHttpRequest
	 */
	function Request() {
		if (XMLHttpRequest) {
			return new XMLHttpRequest();
		}

		// CommonJS require
		if (require) {
			return require("xhr").XMLHttpRequest;
		}

		// nothing compatable with the W3C standard
		return false;
	}
