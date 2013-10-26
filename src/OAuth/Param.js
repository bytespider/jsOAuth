    function Param(name, value) {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            i, queryparam = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(name, value);
        }

        if (name instanceof Array && name.length === 2) {
            queryparam.name  = name[0] + '';
            queryparam.value = name[1] + '';
        } else if (name !== undefined) {
            queryparam.name = name;
            if (value === undefined) {
                queryparam.value = '';
            } else {
                queryparam.value = value;
            }
        }

        return queryparam;
    }

    Param.prototype.copy = function() {
        return new QueryParam(this.name, this.value);
    };

    Param.prototype.toString = function() {
        var encode = OAuth.urlEncode;
        return encode(this.name) + '=' + encode(this.value);
    };
