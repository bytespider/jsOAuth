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
	 
	function Hash() {
	    var hash = this;
	     
	    hash.join = function(string){
	        string = string || '';
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
	         
	        return arr;
	    };
	    hash.values = function(){
	        var i, arr = [], self = this;
	        for (i in self) {
	            if (self.hasOwnProperty(i)) {
	                arr.push(self[i]);
	            }
	        }
	         
	        return arr; 
	    };
	    hash.shift = function(){throw 'not implimented'};
	    hash.unshift = function(){throw 'not implimented'};
	    hash.push = function(){throw 'not implimented'};
	    hash.pop = function(){throw 'not implimented'};
	    hash.sort = function(){throw 'not implimented'};
	     
	    hash.ksort = function(func){
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
	    };
	     
	    return hash;
	}
	Collection.prototype = new Hash;