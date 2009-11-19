    /**
     * OAuth Consumer
     * 
     * @constructor
     * @param {String} key
     * @param {String} secret
     */
    jsOAuth = function (key, secret, callback_url) {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            token = EMPTY_STRING, jsoauth = this;
            
        if (!(jsoauth instanceof args_callee)) {
            return new args_callee(key, secret, callback_url);
        }
        
        jsoauth.key = key; /** @type {String|undefined} */
        jsoauth.secret = secret; /** @type {String|undefined} */
        jsoauth.callback_url = callback_url;  /** @type {String|undefined} */
        jsoauth.signature = EMPTY_STRING;
        jsoauth.signature_method = jsOAuth.SIGNATURE_METHOD['PLAINTEXT'];
        jsoauth.OAUTH_REALM = EMPTY_STRING;
        jsoauth.OAUTH_REQUEST_TOKEN_URL = EMPTY_STRING;
        jsoauth.OAUTH_REQUEST_AUTH_URL = EMPTY_STRING;
        jsoauth.OAUTH_GET_TOKEN_URL = EMPTY_STRING;
            
        jsoauth.oauth_parameters = {
            'oauth_consumer_key': key,
            'oauth_token': token,
            'oauth_signature_method': jsoauth.signature_method,
            'oauth_signature': jsoauth.signature,
            'oauth_timestamp': EMPTY_STRING,
            'oauth_nonce': EMPTY_STRING,
            'oauth_version': jsoauth.OAUTH_VERSION,
            'oauth_verifier': EMPTY_STRING
        };
        
        /**
         * Create a new http request
         * 
         * @param {String} url
         * @param {String} method
         * @param {Object} parameters
         */
        jsoauth.Request = function(url, method, parameters){
            var args = arguments, args_callee = args.callee, args_length = args.length,
                request = this;
                
            if (!(request instanceof args_callee)) {
                return new args_callee(url, method, parameters);
            }
            
            /** @property */
            request.url = url;
            
            /** @property */
            request.method = method;
            
            /** @property */
            request.parameters = (parameters !== UNDEFINED) ? parameters : {};
            
            /**
             * Override toString to collect, sort and concatenate into a 
             * normalized string
             */
            request.parameters.toString = function () {
                var i, params = this.parameters, params_arr = [], 
                enc = this.urlEncode;
                
                params.sort();
                for(i in params){
                    if (params.hasOwnProperty(i) && params[i] !== UNDEFINED) {
                        params_arr.push(enc(i) + '=' + enc(params[i]));
                    }
                }

                return (params_arr.length > 0 ? params_arr.join('&') : UNDEFINED);
            };
            
            /**
             * Set or create a value in the stack
             * 
             * @param {String} parameter
             * @param {String} value
             */
            request.setParameter = function (parameter, value) {
                parameters[parameter] = value;
            };
            
            /**
             * Get a parameter from the stack
             * 
             * @param {String} parameter
             */
            request.getParameter = function (parameter) {
                return parameters.hasOwnProperty(parameter) ? parameters[parameter] : UNDEFINED;
            };
            
            /**
             * Sign a request using the signature_method
             * 
             * @param {Object} consumer
             * @param {String} token
             */
            request.sign = function (consumer, token) {
                var params = consumer.oauth_parameters;
                params.oauth_signature_method = signature_method;
                params.oauth_timestamp = this.timestamp;
                params.oauth_nonce = this.nonce;
            };
            
            /** @property */
            request.timestamp = (new Date).getTime(); // current timestamp
            
            /** @property */
            request.nonce = generateKey(64); // 64-bit rendom key
            
            /** 
             * rfc3986 compatable encode of a string
             * 
             * @param {String} string
             */
            request.urlEncode = function (string){
                var reserved_chars = /( |\!|\*|\"|\'|\(|\)|\;|\:|\@|\&|\=|\+|\$|\,|\/|\?|\%|\#|\[|\]|\<|\>|\{|\}|\||\\|`|\^)/, 
                    str_len = string.length, i, string_arr = string.split('');
                                      
                for (i = 0; i < str_len; i++) {
                    if (string_arr[i].match(reserved_chars)) {
                        string_arr[i] = '%' + (string_arr[i].charCodeAt(0)).toString(16).toUpperCase();
                    }
                }
                
                return string_arr.join('');
            };
            
            /**
             * Override standard toString function so that we can see the 
             * request produced the correct URL
             */
            request.toString = function() {
                var params = jsoauth.oauth_parameters;
                params.sort(); // lexicographical byte value ordering
                
                console.debug(params);
            };
                
            return request;
        };
            
        /**
         * 
         * @constructor
         * @param {String} key
         * @param {String} secret
         */
        jsoauth.Token = function(key, secret){
        
        };
        
        /**
         * @memberOf jsOAuth
         */
        jsoauth.getRequestToken = function () {
            var request = new this.Request(this.OAUTH_REQUEST_AUTH_URL, 
                jsOAuth.HTTP_METHOD_POST, {});
            console.log(request);
        },
        
        /**
         * @memberOf jsOAuth
         */
        jsoauth.requestAuthorization = function () {},
        
        /**
         * @memberOf jsOAuth
         */
        jsoauth.getAccessToken = function () {}
        
        return jsoauth;
    };
    
    function generateKey(key_len) {
        key_len = key_len ? key_len : 64;
        
        var key_bytes = key_len / 8, value = '',
            chars = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
                     '2A', '2B', '2C', '2D', '2E', '2F', '30', '31', '32', '33', 
                     '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D', 
                     '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47', 
                     '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', 
                     '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B', 
                     '5C', '5D', '5E', '5F', '60', '61', '62', '63', '64', '65', 
                     '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F', 
                     '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', 
                     '7A', '7B', '7C', '7D', '7E'],
            i;
        for (i = 0; i < key_bytes; i++) {
            value += chars[rand()];
        }
        
        return value;
        
        function rand() {
            var math = Math;
            return math.floor(math.random() * chars.length);
        }
    }
    
    jsOAuth.HTTP_METHOD_GET          = 'GET';    /** @const */
    jsOAuth.HTTP_METHOD_POST         = 'POST';   /** @const */
    jsOAuth.HTTP_METHOD_PUT          = 'PUT';    /** @const */
    jsOAuth.HTTP_METHOD_DELETE       = 'DELETE'; /** @const */
    
    jsOAuth.OAUTH_VERSION            = '1.0';    /** @const */
    
    jsOAuth.SIGNATURE_METHOD = {
        'HMAC-SHA1': {
            /**
             * Override default toString method to use as a constant key
             */
            toString: function () {
                return 'HMAC-SHA1';
            }
        },
        'PLAINTEXT': {
            toString: function () {
                return 'PLAINTEXT';
            },
            sign: function(){
                var signature = '';
                return signature;
            }
        }
    };
   
    /** closure compiler "export" method, use quoted syntax */
    window['jsOAuth'] = jsOAuth;

