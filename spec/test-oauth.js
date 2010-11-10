var OAuth = require('jsOAuth');

console.debug(JSON.stringify(OAuth));

exports.basics = function (test) {
	test.assertNotEqual(OAuth, undefined, 'OAuth exists');
	test.assertEqual(typeof OAuth({}).get, 'function', 'get function exists')
};
