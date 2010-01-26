function OAuthSignatureMethod() {
    this.name = '';
    this.toString = function() {
        return this.name;
    };
    this.sign = function(){};
    
    this.blocksize = 64;
    this.hash = function(message){};
    
    this.hmac = function(key, message) {
        if (key.length > this.blocksize) {
            key = this.hash(key);
        } else if (key.length < this.blocksize) {
            key = key + (new Array(this.blocksize - key.length)).join(0);
        }
        return this.hash(key ^ (0x5c * this.blocksize) + 
            this.hash((0x36 * this.blocksize) + message));
    };
}