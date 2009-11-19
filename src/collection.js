    
    function Collection (object) {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            collection = this;
            
        if (!(this instanceof args_callee)) {
            return new args_callee(object);
        }
        
        collection.keys = function(){};
        collection.values = function(){};
        return collection;
    }
    Collection.prototype = {};
    
   
    /** closure compiler "export" method, use quoted syntax */
    window['Collection'] = Collection;