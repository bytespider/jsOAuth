function Querystring() {}

Querystring.stringify = function (obj, sep, eq) {
    sep = sep || '&';
    eq = eq || '=';

    var queryArray = [];

    for (var i in obj)
    {
        if (obj.hasOwnProperty(i))
        {
            if (obj[i] !== "")
            {
                queryArray.push(i + eq + obj[i]);
            }
            else
            {
                queryArray.push(i);
            }
        }
    }

    return queryArray.join(sep);
};

Querystring.parse = function (str, sep, eq) {
    sep = sep || '&';
    eq = eq || '=';

    var queryRegex = /\?([a-zA-Z0-9]*)(=([a-zA-Z0-9]*))?/g;
    var obj = {};
    str.replace(queryRegex, function (str, $1, $2, $3) {
        obj[$1] = $3;
        return str;
    });

    return obj;
};

Querystring.escape = function (str) {
    return encodeURIComponent(str);
};

Querystring.unescape = function (str) {
    return str.replace(/%[a-fA-F0-9]{2}/ig, function (match) {
        return String.fromCharCode(parseInt(match.replace('%', ''), 16));
    });
};

module.exports = Querystring;