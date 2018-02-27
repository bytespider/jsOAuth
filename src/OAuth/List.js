    function List() {}

    List.prototype = [];
    List.superclass = Array.prototype;
    List.prototype.constructor = List;

    List.prototype.copy = function() {
        var list = new this.constructor();

        this.forEach(function(value, i) {
            if (typeof value.copy === 'function') {
                value = value.copy();
            }
            list.push(value);
        });

        return list;
    };

    List.prototype.concat = function() {
        var list = this.copy(), i, j, len;

        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Array) {
                for (j = 0, len = arguments[i].length; j < len; j++) {
                    list.push(arguments[i][j]);
                }
            } else {
                list.push(arguments[i]);
            }
        }

        return list;
    };

    List.prototype.getFirst = function() {
        var value = null;

        if (this.length > 0) {
            value = this[0];
        }

        return value;
    };

    if (typeof List.prototype.forEach !== 'function') {
        List.prototype.forEach = function(callback, scope) {
            var i, len;
            for (i = 0, len = this.length; i < len; ++i) {
                if (i in this) {
                    callback.call(scope, this[i], i, this);
                }
            }
            return this;
        }
    };
