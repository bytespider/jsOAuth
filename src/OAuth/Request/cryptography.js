var Utils = require("./Cryptography/Utils");

var Cryptography = {};
Cryptography.SHA1 = require("./Cryptography/SHA1");

Cryptography.digest = function (algorithm, string, raw) {
    raw = raw === true;
    string = Utils.stringToByteArray(string);

    var digest = algorithm(string);

    if (raw) {
        return Utils.byteArrayToString(digest);
    }
    return Utils.byteArrayToHex(digest);
};

Cryptography.hmac = function (algorithm, string, key, raw) {
    raw = raw === true;
    key = Utils.stringToByteArray(key);
    string = Utils.stringToByteArray(string);

    var key_length = key.length,
        byte_array,
        o_pad,
        i_pad,
        i,
        block_size = algorithm.blocksize;

    if (key_length > block_size) {
        key = algorithm(key);
        key_length = key.length;
    }

    key = key.concat(Utils.zeropad(block_size - key_length));

    o_pad = key.slice(0); // copy
    i_pad = key.slice(0); // copy

    for (i = 0; i < block_size; i += 1) {
        o_pad[i] ^= 0x5C;
        i_pad[i] ^= 0x36;
    }

    byte_array = algorithm(o_pad.concat(algorithm(i_pad.concat(string))));

    if (raw === true) {
        return Utils.byteArrayToString(byte_array);
    }
    return Utils.byteArrayToHex(byte_array);
};

module.exports = Cryptography;