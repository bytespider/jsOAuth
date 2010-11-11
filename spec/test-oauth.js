var jsOAuth = require('jsOAuth');
var OAuth = jsOAuth.OAuth;

exports.basics = function (test) {
	test.assertNotEqual(OAuth, undefined, 'OAuth exists');

	var oauth = OAuth({});
	test.assertEqual(typeof oauth.get, 'function', 'get function exists')
};
