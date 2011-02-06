module('OAuth Consumer');
test('Basics', function () {
    ok(window.OAuth !== undefined, 'Global object exists');
});

test('Output URL Encode', function () {
    equals(OAuth.urlEncode(''), '', 'Output test 1');
    equals(OAuth.urlEncode('$ & < > ? ; # : = , " \' ~ + %'), '%24%20%26%20%3C%20%3E%20%3F%20%3B%20%23%20%3A%20%3D%20%2C%20%22%20%27%20~%20%2B%20%25', 'Output test 2');
    
    equals(OAuth.urlEncode('ß'), '%C3%9F', 'Output test 3');
    equals(OAuth.urlEncode('ü'), '%C3%BC', 'Output test 4');
});

asyncTest("OAuth 2-Legged Request", function() {
    stop(5000);
    var oauth = OAuth({
        enablePrivilege: true,
        consumerKey: 'ba9df9055c77f338',
        consumerSecret: '846ffe1ec3b18989e73fe7fff833'
    });
    oauth.get('http://oauth-sandbox.sevengoslings.net/two_legged', function (data) {
        equals(data.text, 'SUCCESS! This is a 2-legged call from the `jsOAuth2` consumer which was made by `bytespider`.', 'Request success');
        start();
    });
});

asyncTest("OAuth 3-Legged Request", function() {
    stop(5000);
    var oauth = OAuth({
        enablePrivilege: true,
        consumerKey: 'ba9df9055c77f338',
        consumerSecret: '846ffe1ec3b18989e73fe7fff833'
    });
    oauth.get('http://oauth-sandbox.sevengoslings.net/three_legged', function (data) {
        console.log(data);
        equals(data.text, 'SUCCESS! This is a 3-legged call from the `jsOAuth2` consumer which was made by `bytespider`.', 'Request success');
        start();
    });
});
