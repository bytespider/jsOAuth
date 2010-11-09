module('OAuth Consumer');
test('Basics', function () {
    ok(window.OAuth !== undefined, 'Global object exists');
});

test('Output URL Encode', function () {
    equals(OAuth.urlEncode(''), '', 'Output test 1');
    equals(OAuth.urlEncode('$ & < > ? ; # : = , " \' ~ + %'), '%24%20%26%20%3C%20%3E%20%3F%20%3B%20%23%20%3A%20%3D%20%2C%20%22%20%27%20~%20%2B%20%25', 'Output test 2');
});
