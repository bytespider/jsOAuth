/**
 * jsOAuth JavaScript OAuth Library v@VERSION
 *
 * @preserve Copyright (c) 2009 Rob Griffiths
 *
 * Date: 
 * Revision: 
 */

(function(){
    var window = this,
        undefined,
        
        /**
         * Main OAuth consumer
         *
         * @constructor
         * @param {string} key
         * @param {string} secret
         * @param {string=} callback_url
         */
        jsOAuth = function (key, secret, callback_url) {
            if (!(this instanceof arguments.callee)) {
                return new arguments.callee(key, secret);
            }
            
            if (arguments.length < 2) {
                throw new Error('jsOAuth requires a key and secret to be provided');
            }
            
            /** @type {string|undefined} */
            this.key = key;
            
            /** @type {string|undefined} */
            this.secret = secret;
            
            /** @type {string|undefined} */
            this.callback_url = callback_url ? callback_url : nul;
        };

        jsOAuth.prototype.OAUTH_REQUEST_TOKEN_URL = '';  /** @const */
        jsOAuth.prototype.OAUTH_REQUEST_AUTH_URL  = '';  /** @const */
        jsOAuth.prototype.OAUTH_GET_TOKEN_URL     = '';  /** @const */
        
        jsOAuth.prototype.getRequestToken = function () {};
        jsOAuth.prototype.requestAuthorization = function () {};
        jsOAuth.prototype.getAccessToken = function () {};
    
    window.jsOAuth = jsOAuth;
})();
