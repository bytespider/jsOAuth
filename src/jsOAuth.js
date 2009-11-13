/**
 * jsOAuth JavaScript OAuth Library v@VERSION
 *
 * @preserve Copyright (c) 2009 Rob Griffiths
 *
 * Date: @DATE
 * Revision: @REV
 */

(function () {
    var 
		window = this,
        undefined,
        
        /**
         * Main OAuth consumer
         *
         * @constructor
         * @param {String} key
         * @param {String} secret
         * @param {String=} callback_url
         */
        jsOAuth = function (key, secret, callback_url) {
            if (!(this instanceof arguments.callee)) {
                return new arguments.callee(key, secret, callback_url);
            }
            
            if (arguments.length < 2) {
                throw new Error('jsOAuth requires a key and secret to be provided');
            }
            
            /** @type {String|undefined} */
            this.key = key;
            
            /** @type {String|undefined} */
            this.secret = secret;
            
            /** @type {Url|undefined} */
            this.callback_url = callback_url ? new Url(callback_url) : null;
        };

    jsOAuth.prototype.OAUTH_REQUEST_TOKEN_URL = '';  /** @const */
    jsOAuth.prototype.OAUTH_REQUEST_AUTH_URL  = '';  /** @const */
    jsOAuth.prototype.OAUTH_GET_TOKEN_URL     = '';  /** @const */
    
    jsOAuth.prototype.getRequestToken = function () {};
    jsOAuth.prototype.requestAuthorization = function () {};
    jsOAuth.prototype.getAccessToken = function () {};
    
    window.jsOAuth = jsOAuth;
}());
