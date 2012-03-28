exports.testBase64Basics = function (test) {
    test.expect(2);
    test.ok(window.btoa !== undefined, 'function btoa exists');
    test.ok(window.atob !== undefined, 'function atob exists');
    test.done();
};

exports.testBase64Encode = function (test) {
    test.expect(7);
    test.equals(window.btoa(''),         '',         'Output test 1');
    test.equals(window.btoa('f'),        'Zg==',     'Output test 2');
    test.equals(window.btoa('fo'),       'Zm8=',     'Output test 3');
    test.equals(window.btoa('foo'),      'Zm9v',     'Output test 4');
    test.equals(window.btoa('foob'),     'Zm9vYg==', 'Output test 5');
    test.equals(window.btoa('fooba'),    'Zm9vYmE=', 'Output test 6');
    test.equals(window.btoa('foobar'),   'Zm9vYmFy', 'Output test 7');
    test.done();
};

exports.testBase64Decode = function (test) {
    test.expect(7);
    test.equals(window.atob(''),         '',         'Output test 1');
    test.equals(window.atob('Zg=='),     'f',        'Output test 2');
    test.equals(window.atob('Zm8='),     'fo',       'Output test 3');
    test.equals(window.atob('Zm9v'),     'foo',      'Output test 4');
    test.equals(window.atob('Zm9vYg=='), 'foob',     'Output test 5');
    test.equals(window.atob('Zm9vYmE='), 'fooba',    'Output test 6');
    test.equals(window.atob('Zm9vYmFy'), 'foobar',   'Output test 7');
    test.done();
};