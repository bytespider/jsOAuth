function OAuthSignatureMethod() {
    this.name = '';
    this.toString = function() {
        return this.name;
    };
    this.sign = function(){};
    
    this.blocksize = 64;
    this.hash = function(message){};
    
    this.hmac = function(key, message) {
        var l = key.length;
        
        if (l > this.blocksize) {
            key = this.hash(key);
        } else if (l < this.blocksize) {
            key = key + (new Array(this.blocksize - l + 1)).join(0);
        }
        
        return this.hash(key ^ (new Array(this.blocksize + 1).join(0x5c)) + 
            this.hash((new Array(this.blocksize + 1).join(0x36)) + message));
    };
}