    
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
        
        hash.join = function(string){
            string = (string != UNDEFINED) ? string : '';
            return this.values().join(string);
        };
        //hash.reverse = function(){};
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
        //hash.shift = function(){};
        //hash.unshift = function(){};
        //hash.push = function(){};
        //hash.pop = function(){};
        hash.sort = function(func){
            var self = this, values = self.values(), i, value, key;
            
            if (func == UNDEFINED) {
                values.sort();
            } else {
                values.sort(func);
            }
            
            for (i = 0; i  < keys.length; i++) {
                key = keys[i];
                value = self[key];
                delete self[key];
                self[key] = value;
            }
            
            return self;
        };
        
        hash.ksort = function(func){
            var self = this, keys = self.keys(), i, value, key;
            
            if (func == UNDEFINED) {
                keys.sort();
            } else {
                keys.sort(func);
            }
            
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