    
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
        var hash = this, _keys = [], _values = [];
        
        hash.ksort = function(func){
            var self = this, keys = (_keys != [] ? _keys : self.keys()), i;
            
            if (func != UNDEFINED) {
                keys.sort(func);
            } else {
                 keys.sort();
            }
            
            for (i = 0; i  < keys.length; i++) {
                self[keys[i]] = self[keys[i]];
            }
        };
        
        hash.sort = function(){};
        hash.join = function(){};
        hash.reverse = function(){};
        hash.keys = function(){
            var i, arr = [], self = this;
            for (i in coll) {
                if (hash.hasOwnProperty(i)) {
                    arr.push(i);
                }
            }
            
            _keys = arr;
            return arr;
        };
        hash.values = function(){
            var i, arr = [], self = this;
            for (i in hash) {
                if (self.hasOwnProperty(i)) {
                    arr.push(coll[i]);
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
            var self = this, keys = (_keys != [] ? _keys : self.keys()), i, value;
            
            if (func != UNDEFINED) {
                keys.sort(func);
            } else {
                 keys.sort();
            }
            for (i = 0; i  < keys.length; i++) {
                value = self[keys[i]];
                delete self[keys[i]]
                self[keys[i]] = value;
            }
        };
        
        return hash;
    }
    Collection.prototype = new Hash;
    
    /** closure compiler "export" method, use quoted syntax */
    if (window['Collection'] === UNDEFINED) {
        // Only give to the world if they want it
        window['Collection'] = Collection;
    }