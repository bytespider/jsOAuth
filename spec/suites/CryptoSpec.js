module('Crypto');
test('Basics', function () {
    ok(SHA1 !== undefined, 'function SHA1 exists');
    ok(HMAC !== undefined, 'function HMAC exists');

    equals(zeroPad(0).join(''), '', 'zeroPad can pad to 0 bytes');
    equals(zeroPad(10).join(''), '0000000000', 'zeroPad can pad to 10 bytes');
    equals(zeroPad(100).join(''), '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', 'zeroPad can pad to 100 bytes');
});

test('Character encoding', function () {
	deepEqual(stringToByteArray("ü"), [195, 188], 'UTF-8 character "ü" encodes correctly in byte array');
	deepEqual(stringToByteArray("ß"), [195, 159], 'UTF-8 character "ß" encodes correctly in byte array');
});

test('Output SHA1', function () {
    equals(SHA1(''),        'da39a3ee5e6b4b0d3255bfef95601890afd80709', 'Output test 1');
    equals(SHA1('f'),       '4a0a19218e082a343a1b17e5333409af9d98f0f5', 'Output test 2');
    equals(SHA1('fo'),      '19082866d46a5a57bfeffe585d8362c149676c90', 'Output test 3');
    equals(SHA1('foo'),     '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', 'Output test 4');
    equals(SHA1('foob'),    '2ca60ec33da4ccdf3c5b4944a2e831a70d76d7c7', 'Output test 5');
    equals(SHA1('fooba'),   'bf3f6e65daa76dde92612355478885eb52473854', 'Output test 6');
    equals(SHA1('foobar'),  '8843d7f92416211de9ebb963ff4ce28125932878', 'Output test 7');
    
    equals(SHA1('ü'),  		'94a759fd37735430753c7b6b80684306d80ea16e', 'Output test 8');
    equals(SHA1('ß'),  		'00b39d61cc9b61a36437c4de643ec56b831e36d5', 'Output test 9');
});

test('Output HMAC-SHA1', function(){
    equals(
        HMAC(
            SHA1.prototype, 'secret', 'foobar', true
        ), '7f5c0e9cb2f07137b1c0249108d5c400a3c39be5', 'Output test 1'
    );
    equals(
        HMAC(
            SHA1.prototype, 'Jefe', 'what do ya want for nothing?', true
        ), 'effcdf6ae5eb2fa2d27416d5f184df9c259a7c79', 'Output test 2'
    );
    equals(
        HMAC(
            SHA1.prototype, 'secrety secret thing', 'jsOAuth rocks!', true
        ), '962a903eef73e63217d7fd14f78ca2fd0ba953b0', 'Output test 3'
    );
    equals(
        HMAC(
            SHA1.prototype, (new Array(101)).join(0), (new Array(101)).join(0), true
        ), '1c8aa692da5848547b7d599436bb9e30d4d93d07', 'Output test 4'
    );
    equals(
        HMAC(
            SHA1.prototype, (new Array(1001)).join(0), (new Array(1001)).join(0), true
        ), '06b7cde817007313eab69aaae86a9f6431210a21', 'Output test 4'
    )
});