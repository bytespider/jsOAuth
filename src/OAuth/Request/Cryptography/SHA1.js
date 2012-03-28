var Utils = require("./Utils");

function fn(t, B, C, D) {
    switch (t) {
        case 0:
            return (B & C) | ((~B) & D);
        case 1:
        case 3:
            return B ^ C ^ D;
        case 2:
            return (B & C) | (B & D) | (C & D);
    }

    return -1;
}

var blocksize = 64;

function SHA1(string) {
    string = string || "";

    if (string.constructor === String) {
        string = Utils.stringToByteArray(string);
    }

    var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],
        K = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],
        lb, hb,
        string_length, pad, string_length_bytes, blocks, b, block, bl, words, i, A, B, C, D, E, t, n, TEMP;

    string_length = string.length;

    pad = (Math.ceil((string_length + 9) / blocksize) * blocksize) - (string_length + 9);

    hb = (Math.floor(string_length / 4294967296));
    lb = (Math.floor(string_length % 4294967296));

    string_length_bytes = [
        ((hb * 8) >> 24) & 255,
        ((hb * 8) >> 16) & 255,
        ((hb * 8) >> 8) & 255,
        (hb * 8) & 255,
        ((lb * 8) >> 24) & 255,
        ((lb * 8) >> 16) & 255,
        ((lb * 8) >> 8) & 255,
        (lb * 8) & 255
    ];

    string = string.concat([0x80], Utils.zeropad(pad), string_length_bytes);

    blocks = Math.ceil(string.length / blocksize);

    for (b = 0; b < blocks; b += 1) {
        block = string.slice(b * blocksize, (b + 1) * blocksize);
        bl = block.length;

        words = [];

        for (i = 0; i < bl; i += 1) {
            words[i >>> 2] |= block[i] << (24 - (i - ((i >> 2) * 4)) * 8);
        }

        A = H[0];
        B = H[1];
        C = H[2];
        D = H[3];
        E = H[4];

        for (t=0; t < 80; t += 1) {
            if (t >= 16) {
                words[t] = Utils.leftrotate(words[t - 3] ^ words[t - 8] ^ words[t - 14] ^ words[t - 16], 1);
            }

            n = Math.floor(t / 20);
            TEMP = Utils.leftrotate(A, 5) + fn(n, B, C, D) + E + K[n] + words[t];

            E = D;
            D = C;
            C = Utils.leftrotate(B, 30);
            B = A;
            A = TEMP;
        }

        H[0] += A;
        H[1] += B;
        H[2] += C;
        H[3] += D;
        H[4] += E;
    }

    return Utils.wordsToByteArray(H);
}

SHA1.blocksize = blocksize;

module.exports = SHA1;