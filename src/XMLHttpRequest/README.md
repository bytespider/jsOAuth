# node-XMLHttpRequest #

node-XMLHttpRequest is a wrapper for the built-in http client to emulate the
browser XMLHttpRequest object.

This can be used with JS designed for browsers to improve reuse of code and
allow the use of existing libraries.

## Usage ##
Here's how to include the module in your project and use as the browser-based
XHR object.

	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xhr = new XMLHttpRequest();

Note: use the lowercase string "xmlhttprequest" in your require(). On
case-sensitive systems (eg Linux) using uppercase letters won't work.

Refer to [W3C specs](http://www.w3.org/TR/XMLHttpRequest/) for XHR methods.

## Versions ##

Prior to 1.4.0 version numbers were arbitrary. From 1.4.0 on they conform to
the standard major.minor.bugfix. 1.x shouldn't necessarily be considered
stable just because it's above 0.x.

Since the XMLHttpRequest API is stable this library's API is stable as
well. Major version numbers indicate significant core code changes.
Minor versions indicate minor core code changes or better conformity to
the W3C spec.

## Supports ##

* Async and synchronous requests
* GET, POST, PUT, and DELETE requests
* All native methods (open, send, abort, getRequestHeader,
  getAllRequestHeaders)
* Requests to all domains

## TODO ##

* Add basic authentication
* Additional unit tests
* Possibly move from http to tcp for more flexibility
* XML parsing
