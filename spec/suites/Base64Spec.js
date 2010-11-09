module('Base64');
test('Basics', function () {
    ok(window.btoa !== undefined, 'function btoa exists');
    ok(window.atob !== undefined, 'function atob exists');
});

test('Output Base64 encode', function () {
    equals(window.btoa(''),         '',         'Output test 1');
    equals(window.btoa('f'),        'Zg==',     'Output test 2');
    equals(window.btoa('fo'),       'Zm8=',     'Output test 3');
    equals(window.btoa('foo'),      'Zm9v',     'Output test 4');
    equals(window.btoa('foob'),     'Zm9vYg==', 'Output test 5');
    equals(window.btoa('fooba'),    'Zm9vYmE=', 'Output test 6');
    equals(window.btoa('foobar'),   'Zm9vYmFy', 'Output test 7');
});

// whilst I haven't written a decode, I may in the future
test('Output Base64 decode', function () {
    equals(window.atob(''),         '',         'Output test 1');
    equals(window.atob('Zg=='),     'f',        'Output test 2');
    equals(window.atob('Zm8='),     'fo',       'Output test 3');
    equals(window.atob('Zm9v'),     'foo',      'Output test 4');
    equals(window.atob('Zm9vYg=='), 'foob',     'Output test 5');
    equals(window.atob('Zm9vYmE='), 'fooba',    'Output test 6');
    equals(window.atob('Zm9vYmFy'), 'foobar',   'Output test 7');
});
