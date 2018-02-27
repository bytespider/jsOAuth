    function ParamList(arr) {
        ParamList.superclass.constructor.call(this, arr);

        var args = arguments, args_callee = args.callee, i, paramlist = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(arr);
        }

        if (arr instanceof ParamList) {
            arr.forEach(function(param) {
                paramlist.push(param);
            });
        } else if (arr instanceof Array) {
            for (i = 0; i < arr.length; i++) {
                if (arr[i] instanceof Array && arr[i].length === 2) {
                    paramlist.push(new Param(arr[i][0], arr[i][1]));
                }
            }
        }

        return paramlist;
    }

    // ParamList is a type of list So inherit
    ParamList.prototype = new List();
    ParamList.superclass = List.prototype;
    ParamList.prototype.constructor = ParamList;

    ParamList.prototype.getByNameInsensitive = function(name) {
        var list = new this.constructor();

        this.forEach(function(param) {
            if (param.name.toLowerCase() === name.toLowerCase()) {
                list.push(param);
            }
        });

        return list;
    };

    ParamList.prototype.getByName = function(name) {
        var list = new this.constructor();

        this.forEach(function(param) {
            if (param.name === name) {
                list.push(param);
            }
        });

        return list;
    };

    ParamList.prototype.sort = function(fn) {

        // default to byte-order sorting of names and then values
        if (typeof fn === 'undefined') {
            fn = function(a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                if (a.value < b.value) {
                    return -1;
                }
                if (a.value > b.value) {
                    return 1;
                }
                return 0;
            };
        }

        return ParamList.superclass.sort.call(this, fn);
    };

    ParamList.prototype.removeByName = function(name) {
        var i, length = this.length;
        for (i = 0; i < length; i++) {
            if (this[i].name === name) {
                this.splice(i, 1);
                i--;
                length--;
            }
        }
        return this;
    };

    ParamList.prototype.toString = function () {
        var q_arr = [], ret = '';

        this.sort().forEach(function(param) {
            q_arr.push(param + '');
        });

        if (q_arr.length > 0) {
            ret = q_arr.join('&');
        }

        return ret;
    };

    ParamList.prototype.toJSON = function() {
        var q_arr = [];

        this.forEach(function(param) {
            q_arr.push([ param.name, param.value ]);
        });

        return q_arr;
    };
