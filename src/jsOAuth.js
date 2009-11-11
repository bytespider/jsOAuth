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
            if (arguments.length < 2) {
                throw new Error('jsOAuth requires a key and secret to be provided');
            }

            if (!(this instanceof arguments.callee)) {
                return new jsOAuth.Consumer(key, secret, callback_url);
            } else {
                /** @type {string|undefined} */
                this.key = key;

                /** @type {string|undefined} */
                this.secret = secret;
                
                /** @type {null|string|undefined} */
                this.callback_url = (callback_url === undefined ? null : callback_url);
            }
        };
})();
