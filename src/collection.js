    
    Collection = function (obj) {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            i, collection = this;
          
        if (!(this instanceof args_callee)) {
            return new args_callee(obj);
        }
        
        for(i in obj) {
            if (obj.hasOwnProperty(i)) {
                collection[i] = obj[i];
            }
        }
                
        return collection;
    };
    
    function Hash() {
        var hash = this;
        
        hash.sort = function(){};
        hash.join = function(){};
        hash.reverse = function(){};
        hash.keys = function(){
            var i, arr = [], self = this;
            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    arr.push(i);
                }
            }
            
            _keys = arr;
            return arr;
        };
        hash.values = function(){
            var i, arr = [], self = this;
            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    arr.push(self[i]);
                }
            }
            
            _values = arr;
            return arr; 
        };
        hash.shift = function(){};
        hash.unshift = function(){};
        hash.push = function(){};
        hash.pop = function(){};
        hash.ksort = function(func){
            var self = this, keys = self.keys(), i, value, key;
            
            if (func == UNDEFINED) {
                func = function (a, b) {return (a > b ? 1 : (a < b ? -1 : 0))};
            }
            
            keys.sort(func);
            
            for (i = 0; i  < keys.length; i++) {
                key = keys[i];
                value = self[key];
                delete self[key];
                self[key] = value;
            }
            
            return self;
        };
        
        return hash;
    }
    Collection.prototype = new Hash;
    
    /** closure compiler "export" method, use quoted syntax */
    if (window['Collection'] === UNDEFINED) {
        // Only give to the world if they want it
        window['Collection'] = Collection;
    }