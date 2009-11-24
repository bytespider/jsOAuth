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
            
        if (!(this instanceof args_callee)) {
            return new args_callee(key, secret, callback_url);
        }
        
        jsoauth.key = key; /** @type {String|undefined} */
        jsoauth.secret = secret; /** @type {String|undefined} */
        jsoauth.callback_url = callback_url;  /** @type {String|undefined} */
        jsoauth.signature = '';
        jsoauth.signature_method = jsOAuth.SIGNATURE_METHOD['PLAINTEXT'];
        jsoauth.OAUTH_REALM = '';
        jsoauth.OAUTH_REQUEST_TOKEN_URL = '';
        jsoauth.OAUTH_REQUEST_AUTH_URL = '';
        jsoauth.OAUTH_GET_TOKEN_URL = '';
            
        jsoauth.oauth_parameters = {
            'oauth_consumer_key': key,
            'oauth_token': token,
            'oauth_signature_method': jsoauth.signature_method,
            'oauth_signature': jsoauth.signature,
            'oauth_timestamp': '',
            'oauth_nonce': '',
            'oauth_version': jsoauth.OAUTH_VERSION,
            'oauth_verifier': ''
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
                
            if (!(this instanceof args_callee)) {
                return new args_callee(url, method, parameters);
            }
            
            request = jsoauth.Request.prototype.constructor.call(
                request, url, method, parameters);
                
            /** @property */
            request.timestamp = (new Date).getTime(); // current timestamp
        
            /** @property */
            request.nonce = generateKey(64); // 64-bit rendom key
            
            return request;
        };
        
        jsoauth.Request.prototype = new HttpRequest();
        
        /**
         * Sign a request using the signature_method
         * 
         * @param {Object} consumer
         * @param {String} token
         */
        jsoauth.Request.prototype.sign = function (consumer, token) {
            var params = consumer.oauth_parameters;
            params.oauth_signature_method = signature_method;
            params.oauth_timestamp = this.timestamp;
            params.oauth_nonce = this.nonce;
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
            console.log(this.OAUTH_REQUEST_TOKEN_URL, 'in getRequestToken');
            console.log(HttpRequest.METHOD_GET);
            var request = new this.Request(this.OAUTH_REQUEST_TOKEN_URL, 
                HttpRequest.METHOD_GET, {});
                
            console.debug(request);
            request.send();
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
        
        var key_bytes = key_len / 8, value = '', key_iter = key_bytes / 4, 
            key_remainder = key_bytes % 4,
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
        
        for (i = 0; i < key_iter; i++) {
            value += chars[rand()] + chars[rand()] + chars[rand()]+ chars[rand()];
        }
        
        // handle remaing bytes
        for (i = 0; i < key_remainder; i++) {
            value += chars[rand()];
        }
        
        return value;
        
        function rand() {
            var math = Math;
            return math.floor(math.random() * chars.length);
        }
    }
        
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

