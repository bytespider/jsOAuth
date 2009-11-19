(function(){
    function Hash (object) {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            hash = this;
            
        if (!(this instanceof args_callee)) {
            return new args_callee(object);
        }
    }
    
    Hash.prototype = new Object();
}());
