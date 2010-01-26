function OAuthSignatureMethod() {
    this.name = '';
    this.toString = function() {
        return this.name;
    };
    this.sign = function(){};
    
    this.blocksize = 64;
    this.hash = function(message){};
    
    this.hmac = function(key, message) {
        //key = toByteString(key);
        //message = toByteString(message);
        if (key.length > this.blocksize) {
            key = this.hash(key);
        } else if (key.length < this.blocksize) {
            key = key + ((this.blocksize - key.length) * 0x00);
        }
        
        console.log(key);
        
        return this.hash(key ^ (0x5c * this.blocksize) + 
            this.hash((0x36 * this.blocksize) + message));
    };
    
    function toByteString(str) {
        return str.replace(/./g, function(s){
            return s.charCodeAt(0) & 0xFF;
        });
    }
}