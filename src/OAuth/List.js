    function List() {
        var self = this;
        self.values = [];
    }

    List.prototype = {
        join: function(string) {
            string = string || '';
            return this.values.join(string);
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
            var i, value;

            var list = new List();

            for (i = 0; i < this.values.length; i++) {
                if (typeof this.values[i].copy === 'function') {
                    value = this.values[i].copy();
                } else {
                    value = this.values[i];
                }
                list.push(value);
            }

            return list;
        },
        shift: function() {
            return this.values.shift();
        },
        unshift: function() {
            this.values.unshift(arguments);
            return this;
        },
        push: function() {
            this.values.push(arguments);
            return this;
        },
        pop: function() {
            return this.values.pop();
        },
        sort: function() {
            this.values.sort();
            return this;
        }
    };
