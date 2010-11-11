    function SHA1(message) {
        if (message != undefined) {
            var m = message, crypto, digest;
            if (m.constructor === String) {
                m = stringToByteArray(m);
            }

            if (global == this) {
                crypto =  new SHA1(message);
            } else {
                crypto = this;
            }
            digest = crypto.hash(m);

            return byteArrayToHex(digest);
        } else {
            if (global == this) {
                return new SHA1();
            }
        }

        return this;
    }

    SHA1.prototype = new SHA1();
    SHA1.prototype.blocksize = 64;
    SHA1.prototype.hash = function (m) {
        var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],
            K = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],
            lb, hb,
            l, pad, ml, blocks, b, block, bl, w, i, A, B, C, D, E, t, n, TEMP;


        if (m.constructor === String) {
            m = stringToByteArray(m);
        }

        l = m.length;

        pad = (Math.ceil((l + 9) / this.blocksize) * this.blocksize) - (l + 9);

        hb = (Math.floor(l / 4294967296));
        lb = (Math.floor(l % 4294967296));

        ml = [
            ((hb * 8) >> 24) & 255,
            ((hb * 8) >> 16) & 255,
            ((hb * 8) >> 8) & 255,
            (hb * 8) & 255,
            ((lb * 8) >> 24) & 255,
            ((lb * 8) >> 16) & 255,
            ((lb * 8) >> 8) & 255,
            (lb * 8) & 255
        ];

        m = m.concat([0x80], zeroPad(pad), ml);

        blocks = Math.ceil(m.length / this.blocksize);

        for (b = 0; b < blocks; b++) {
            block = m.slice(b * this.blocksize, (b+1) * this.blocksize);
            bl = block.length;

            w = [];

            for (i = 0; i < bl; i++) {
                w[i >>> 2] |= block[i] << (24 - (i - ((i >> 2) * 4)) * 8);
            }

            A = H[0];
            B = H[1];
            C = H[2];
            D = H[3];
            E = H[4];

            for (t=0; t < 80; t++) {
            if (t >= 16) {
                w[t] = leftrotate(w[t-3] ^ w[t-8] ^ w[t-14] ^ w[t-16], 1);
            }

            n = Math.floor(t / 20);
            TEMP = leftrotate(A, 5) + fn(n, B, C, D) + E + K[n] + w[t];

            E = D;
            D = C;
            C = leftrotate(B, 30);
            B = A;
            A = TEMP;
            }

            H[0] += A;
            H[1] += B;
            H[2] += C;
            H[3] += D;
            H[4] += E;
        }

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

        return wordsToByteArray(H);
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

    function zeroPad(length) {
        return new Array(length + 1).join(0).split('');
    };

    function stringToByteArray(str) {
        var bytes = [], i, code, byteA, byteB, byteC, byteD;
        for(i = 0; i < str.length; i++) {
            code = str.charCodeAt(i);
            byteA = (code >>> 24);
            byteB = (code >>> 16);
            byteC = (code >>> 8);
            byteD = code & 0xFF;

            if (byteA > 0) {
                bytes.push(byteA);
            }
            if (byteB > 0) {
                bytes.push(byteB);
            }
            if (byteC > 0) {
                bytes.push(byteC);
            }
            if (byteD > 0) {
                bytes.push(byteD);
            }
        }
        return bytes;
    };

    function wordsToByteArray(words) {
        var bytes = [], i;
        for (i = 0; i < words.length * 32; i += 8) {
            bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 0xFF);
        }
        return bytes;
    };

    function byteArrayToHex(byteArray) {
        var hex = [], l = byteArray.length, i;
        for (i = 0; i < l; i++) {
            hex.push((byteArray[i] >>> 4).toString(16));
            hex.push((byteArray[i] & 0xF).toString(16));
        }
        return hex.join('');
    };

    function byteArrayToString(byteArray) {
        var string = '', l = byteArray.length, i;
        for (i = 0; i < l; i++) {
            string += String.fromCharCode(byteArray[i]);
        }
        return string;
    };

    function leftrotate(value, shift) {
        return (value << shift) | (value >>> (32 - shift));
    };
