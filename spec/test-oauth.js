var jsOAuth = require('jsOAuth');
var OAuth = jsOAuth.OAuth;

exports.basics = function (test) {
	test.assertNotEqual(OAuth, undefined, 'OAuth exists');

	var oauth;
	oauth = OAuth({});
	test.assertEqual(typeof oauth.get, 'function', 'get function exists');
};

exports.twoLeggedCalls = function (test) {
	var options = {
		consumerKey: 'ba9df9055c77f338',
		consumerSecret: '846ffe1ec3b18989e73fe7fff833'
	};

	var oauth = OAuth(options);
	test.waitUntilDone();
	oauth.get('http://oauth-sandbox.sevengoslings.net/two_legged', function (data) {
		test.assertEqual(data.text, 'SUCCESS! This is a 2-legged call from the `jsOAuth2` consumer which was made by `bytespider`.', 'Request made successfully');
		test.done();
	});
};
