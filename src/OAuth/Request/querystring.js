var exports; // define it if it doesnt exist
!function (global) {
    function Querystring()
    {
    }

    Querystring.stringify = function (obj, sep, eq)
    {
        sep = sep || '&';
        eq = eq || '=';
    }

    Querystring.parse = function (obj, sep, eq)
    {
        sep = sep || '&';
        eq = eq || '=';

        var queryRegex = /\?([a-zA-Z0-9]*)(=([a-zA-Z0-9]*))?/g;
        var query = {};
        query_string.replace(queryRegex, function (str, $1, $2, $3) {
            query[$1] = $3;
            return str;
        });
    }

    Querystring.escape = function (str)
    {
        return encodeURIComponent(str);
    }

    Querystring.unescape = function (str)
    {
        return str.replace(/%[a-fA-F0-9]{2}/ig, function (match) {
            return String.fromCharCode(parseInt(match.replace('%', ''), 16));
        });
    }

    global.stringify = Querystring.stringify;
    global.parse = Querystring.parse;
    global.escape = Querystring.escape;
    global.unescape = Querystring.unescape;
}(exports || this);