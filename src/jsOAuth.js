/*!
 * jsOAuth JavaScript OAuth Library v@VERSION
 *
 * Copyright (c) 2009 Rob Griffiths
 *
 * Date: 
 * Revision: 
 */

(function(){
    var window = this,
        undefined,
        
        jsOAuth = function (key, secret, callback_url) {
            var self = this;
            if (arguments.length < 2) {
                throw new Error('jsOAuth requires a key and secret to be provided');
            }

            if (!(this instanceof arguments.callee)) {
                return new jsOAuth.Consumer(key, secret, callback_url);
            } else {
                self.key = key;
                self.secret = secret;
                self.callback_url = callback_url ? callback_url : null;
            }
        };
})();
