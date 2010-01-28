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
            key = key + (new Array(1 + this.blocksize - l)).join(0);
        }
        
        return this.hash(key ^ (new Array(1 + this.blocksize).join(0x5c)) + 
            this.hash((new Array(1 + this.blocksize).join(0x36)) + message));
    };
}