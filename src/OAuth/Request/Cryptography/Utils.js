exports.stringToByteArray = function (string) {
    var bytes = [], code, i = 0, string_length = string.length;

    for(; i < string_length; i += 1) {
        code = string.charCodeAt(i);

        if (code < 128) {
            bytes.push(code);
        } else if (code < 2048) {
            bytes.push(192 + (code >> 6), 128 + (code & 63));
        } else if (code < 65536) {
            bytes.push(224 + (code >> 12), 128 + ((code >> 6) & 63), 128 + (code & 63));
        } else if (code < 2097152) {
            bytes.push(240 + (code >> 18), 128 + ((code >> 12) & 63), 128 + ((code >> 6) & 63), 128 + (code & 63));
        }
    }

    return bytes;
};

exports.wordsToByteArray = function (words) {
    var bytes = [], i = 0, words_length = words.length;
    for (; i < words_length * 32; i += 8) {
        bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 255);
    }
    return bytes;
};

exports.byteArrayToString = function (byte_array) {
    var string = "", i = 0, byte_array_length = byte_array.length;
    for (; i < byte_array_length; i += 1) {
        string += String.fromCharCode(byte_array[i]);
    }
    return string;
};

exports.byteArrayToHex = function (byte_array) {
    var hex = [], i = 0, byte_array_length = byte_array.length;
    for (; i < byte_array_length; i += 1) {
        hex.push((byte_array[i] >>> 4).toString(16));
        hex.push((byte_array[i] & 0xF).toString(16));
    }
    return hex.join("");
};

exports.zeropad = function (length) {
    var arr = new Array(length + 1);
    return arr.join(0).split("");
};

exports.leftrotate = function (value, shift) {
    return (value << shift) | (value >>> (32 - shift));
};