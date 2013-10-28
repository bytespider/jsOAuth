    function Param(name, value) {
        var args = arguments, args_callee = args.callee, args_length = args.length,
            i, param = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(name, value);
        }

        if (name instanceof Array && name.length === 2) {
            param.name  = name[0] + '';
            param.value = name[1] + '';
        } else if (name !== undefined) {
            param.name = name;
            if (value === undefined) {
                param.value = '';
            } else {
                param.value = value;
            }
        }

        return param;
    }

    Param.prototype.copy = function() {
        return new Param(this.name, this.value);
    };

    Param.prototype.toString = function() {
        var encode = OAuth.urlEncode;
        return encode(this.name) + '=' + encode(this.value);
    };
