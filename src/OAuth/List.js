    function List() {
        this.values = [];
    }

    List.prototype = {
        constructor: List,
        join: function(string) {
            string = string || '';
            return this.values.join(string);
        },
        length: function() {
            return this.values.length;
        },
        concat: function(obj) {
            var self = this;

            if (obj instanceof List) {
                obj = obj.values;
            } else if (!(obj instanceof Array)) {
                throw 'Can only concat lists or arrays.';
            }

            this.values = this.values.concat(obj);
            return this;
        },
        copy: function() {
            var list = new this.constructor();

            this.each(function(i, value) {
                if (typeof value.copy === 'function') {
                    value = value.copy();
                }
                list.push(value);
            });

            return list;
        },
        shift: function() {
            return this.values.shift();
        },
        unshift: function() {
            this.values.unshift.apply(this.values, arguments);
            return this;
        },
        push: function() {
            this.values.push.apply(this.values, arguments);
            return this;
        },
        pop: function() {
            return this.values.pop();
        },
        sort: function() {
            this.values.sort();
            return this;
        },
        getFirst: function() {
            var value = null;

            if (this.length() > 0) {
                value = this.values[0];
            }

            return value;
        },
        each: function(callback) {
            var i;
            for (i = 0; i < this.length(); i++) {
                callback(i, this.values[i]);
            }
            return this;
        }
    };
