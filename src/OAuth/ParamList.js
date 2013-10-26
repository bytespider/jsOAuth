    function ParamList(arr) {
        var args = arguments, args_callee = args.callee, i, paramlist = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(arr);
        }

        if (arr instanceof ParamList) {
            for (i = 0; i < arr.values.length; i++) {
                paramlist.push(arr.values[i]);
            }
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

    ParamList.prototype.sort = function() {
        // byte-order sorting of names and then values
        this.values.sort(function(a, b) {
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
        });

        return self;
    };

    ParamList.prototype.toString = function () {
        var i, q_arr = [], ret = '', encode = OAuth.urlEncode;

        this.sort();

        for (i = 0; i < this.values.length; i++) {
            q_arr.push(this.values[i] + '');
        }

        if (q_arr.length > 0) {
            ret = q_arr.join('&');
        }

        return ret;
    };

    ParamList.prototype.toArray = function() {
        var q_arr = [], i;
        for (i = 0; i < this.values.length; i++) {
            q_arr.push([ this.values[i].name, this.values[i].value ]);
        }
        return q_arr;
    };
