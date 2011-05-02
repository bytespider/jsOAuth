    function Collection(obj) {
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
     
    function Hash() {}
    Hash.prototype = {
        join: function(string){
            string = string || '';
            return this.values().join(string);
        },
        keys: function(){
            var i, arr = [], self = this;
            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    arr.push(i);
                }
            }
             
            return arr;
        },
        values: function(){
            var i, arr = [], self = this;
            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    arr.push(self[i]);
                }
            }
             
            return arr; 
        },
        shift: function(){throw 'not implimented'},
        unshift: function(){throw 'not implimented'},
        push: function(){throw 'not implimented'},
        pop: function(){throw 'not implimented'},
        sort: function(){throw 'not implimented'},
         
        ksort: function(func){
            var self = this, keys = self.keys(), i, value, key;
             
            if (func == undefined) {
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
        },
        toObject: function () {
            var obj = {}, i, self = this;;
            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    obj[i] = self[i];
                }
            }
            
            return obj;
        }
    };
    Collection.prototype = new Hash;