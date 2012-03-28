function zeroPad(length) {
    var arr = new Array(++length);
    return arr.join(0).split('');
}

function stringToByteArray(str) {
    var bytes = [], code, i;

    for(i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);

        if (code < 128) {
            bytes.push(code);
        } else if (code < 2048) {
            bytes.push(192+(code>>6), 128+(code&63));
        } else if (code < 65536) {
            bytes.push(224+(code>>12), 128+((code>>6)&63), 128+(code&63));
        } else if (code < 2097152) {
            bytes.push(240+(code>>18), 128+((code>>12)&63), 128+((code>>6)&63), 128+(code&63));
        }
    }

    return bytes;
}

function wordsToByteArray(words) {
    var bytes = [], i;
    for (i = 0; i < words.length * 32; i += 8) {
        bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 255);
    }
    return bytes;
}

function byteArrayToHex(byteArray) {
    var hex = [], l = byteArray.length, i;
    for (i = 0; i < l; i++) {
        hex.push((byteArray[i] >>> 4).toString(16));
        hex.push((byteArray[i] & 0xF).toString(16));
    }
    return hex.join('');
}

function byteArrayToString(byteArray) {
    var string = '', l = byteArray.length, i;
    for (i = 0; i < l; i++) {
        string += String.fromCharCode(byteArray[i]);
    }
    return string;
}

function leftrotate(value, shift) {
    return (value << shift) | (value >>> (32 - shift));
}

function HMAC(fn, key, message, toHex){
    var k = stringToByteArray(key), m = stringToByteArray(message),
        l = k.length, byteArray, oPad, iPad, i;

    if (l > fn.blocksize) {
        k = fn.hash(k);
        l = k.length;
    }

    k = k.concat(zeroPad(fn.blocksize - l));

    oPad = k.slice(0); // copy
    iPad = k.slice(0); // copy

    for (i = 0; i < fn.blocksize; i++) {
        oPad[i] ^= 0x5C;
        iPad[i] ^= 0x36;
    }

    byteArray = fn.hash(oPad.concat(fn.hash(iPad.concat(m))));

    if (toHex) {
        return byteArrayToHex(byteArray);
    }
    return byteArrayToString(byteArray);
}

exports.HMAC = HMAC;
exports.SHA1 = SHA1;