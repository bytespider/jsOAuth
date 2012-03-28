var Url = require("../../src/OAuth/Request/url");

exports.testUrlParsing = function (test) {
    var parse_tests = {
        'HTTP://www.example.com/' : 'http://www.example.com/',
        'http://www.ExAmPlE.com/' : 'http://www.example.com/',
        'http://user:pw@www.ExAmPlE.com/' : 'http://user:pw@www.example.com/',
        'http://USER:PW@www.ExAmPlE.com/' : 'http://USER:PW@www.example.com/',
        'HTTP://X.COM/Y' : 'http://x.com/Y',

        'http://x...y...#p': 'http://x...y...#p',
        'http://x/p/"quoted"': 'http://x/p/',
        'http://www.narwhaljs.org/blog/categories?id=news' : 'http://www.narwhaljs.org/blog/categories?id=news',

        'file:///etc/passwd' : 'file:///etc/passwd',
        'file://localhost/etc/passwd' : 'file://localhost/etc/passwd',
        'file://foo/etc/passwd' : 'file://foo/etc/passwd',
        'file:///etc/node/' : 'file:///etc/node/',
        'file://localhost/etc/node/' : 'file://localhost/etc/node/',
        'file://foo/etc/node/' : 'file://foo/etc/node/',
        'http://user:pass@example.com:8000/foo/bar?baz=quux#frag' : 'http://user:pass@example.com:8000/foo/bar?baz=quux#frag',

        'http://bucket_name.s3.amazonaws.com/image.jpg': 'http://bucket_name.s3.amazonaws.com/image.jpg',
        'git+http://github.com/joyent/node.git': 'git+http://github.com/joyent/node.git',

        //While this may seem counter-intuitive, a browser will parse
        //<a href='www.google.com'> as a path.
        'www.example.com' : 'http://www.example.com'
    };

    test.expect(parse_tests.length);

    var u;
    for (u in parse_tests)
    {
        var actual = Url.parse(u).toString();
        var expected = parse_tests[u];

        test.strictEqual(actual, expected, u);
    }

    test.done();
};