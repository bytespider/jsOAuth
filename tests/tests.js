var time_start = (new Date).getTime();

if (!fireunit) {
    throw new Error('FireUnit is required for unit testing.See http://fireunit.org/'); //http://fireunit.org/
}

fireunit.ok(typeof jsOAuth == 'function', 'jsOAuth is a constructor');

var key = 'key';
var secret = 'secret';

// CONSTANTS
fireunit.compare('1.0',		jsOAuth.prototype.OAUTH_VERSION,		'jsOAuth.prototype.OAUTH_VERSION');

var consumer = new jsOAuth(key, secret);
fireunit.ok(consumer instanceof jsOAuth, 'consumer typeof jsOAuth');

fireunit.compare(key,	consumer.key,	'consumer.key = key');
fireunit.compare(secret,consumer.secret,'consumer.secret = secret');
fireunit.compare(undefined,consumer.callback_url,'consumer.callback_url = undefined');

fireunit.ok(typeof consumer.Request == 'function', 'consumer.Request is a constructor');
var nonce_list = {}, nonce_a, nonce_b;
for (var i = 0; i < 500; i++) {
    nonce_a = (new consumer.Request(null, null)).nonce;
    fireunit.ok(nonce_list[nonce_a] != true, 'Nonce: ' + nonce_a + ' is unique');
    nonce_b = (new consumer.Request(null, null)).nonce;
    fireunit.ok(nonce_list[nonce_b] != true, 'Nonce: ' + nonce_b + ' is unique');
    nonce_list[nonce_a] = true;
    nonce_list[nonce_b] = true;
}
fireunit.ok(nonce_b.length == 16, 'Nonce length is 16 (2chars per byte), 64bits of entropy');

// test url generation
fireunit.compare(
    'This%20string%20has%20spaces%2Astars%2F%5Cslashes%22quotes%3Acolons.periods%3Dequals%26ampersands', 
    Uri.QueryString.urlEncode('This string has spaces*stars/\\slashes"quotes:colons.periods=equals&ampersands'),
    'urlEncode encodes string correctly'
);

// test Collection
fireunit.ok(typeof Collection == 'function', 'Collection is a constructor');
var fruit = new Collection(
    {'apple':'an apple', 'pear':'a pear', 'kiwi':'a kiwi', 'orange':'an orange'}
);
fruit.passion = 'Passion fruit';
fireunit.ok(fruit instanceof Collection, 'fruit instanceof Collection');

// test QueryString
fireunit.ok(typeof QueryString == 'function', 'QueryString is a constructor');
var query = new QueryString(
    {'param_a':'an apple', 'param_c':'a pear', 'param_b':'a kiwi', 'orange':'an orange'}
);
query.test = 'Passion fruit';
fireunit.ok(query instanceof QueryString, 'query instanceof QueryString');
fireunit.compare('orange=an%20orange&param_a=an%20apple&param_b=a%20kiwi&param_c=a%20pear&test=Passion%20fruit', query.asString(), 'query is orange=an%20orange&param_a=an%20apple&param_b=a%20kiwi&param_c=a%20pear');


// test Http
fireunit.ok(typeof HttpRequest == 'function', 'HttpRequest is a constructor');
var connection = new HttpRequest('http://www.google.com/search', HttpRequest.METHOD_GET, {
    q: 'jsOAuth'
});
fireunit.ok(connection instanceof HttpRequest, 'connection instanceof HttpRequest');

fireunit.compare('GET',     HttpRequest.METHOD_GET,     'HttpRequest.METHOD_GET');
fireunit.compare('POST',    HttpRequest.METHOD_POST,    'HttpRequest.METHOD_POST');
fireunit.compare('PUT',     HttpRequest.METHOD_PUT,     'HttpRequest.METHOD_PUT');
fireunit.compare('DELETE',  HttpRequest.METHOD_DELETE,  'HttpRequest.METHOD_DELETE');
fireunit.compare('HEAD',  HttpRequest.METHOD_HEAD,    'HttpRequest.METHOD_HEAD');
fireunit.compare('OPTIONS',  HttpRequest.METHOD_OPTIONS,  'HttpRequest.METHOD_OPTIONS');

connection.setUserAgent('test user agent');
fireunit.compare('test user agent', connection.getUserAgent(), 'Set and get useragent string');

// Only testing Urls
fireunit.ok(typeof Uri == 'function', 'Url is a constructor');

fireunit.compare('http://www.google.com', new Uri('www.google.com'), 'www.google.com');
fireunit.compare('http://www.google.com/', new Uri('www.google.com/'), 'www.google.com/');
fireunit.compare('http://www.google.com/', new Uri('www.google.com/?'), 'www.google.com/?');
fireunit.compare('http://www.google.com/search', new Uri('www.google.com/search'), 'www.google.com/search');
fireunit.compare('http://www.google.com/search?q=test', new Uri('www.google.com/search?q=test'), 'http://www.google.com/search?q=test');
fireunit.compare('http://www.google.com/search?q=test#anchor', new Uri('www.google.com/search?q=test#anchor'), 'http://www.google.com/search?q=test#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Uri('www.google.com/search?#anchor'), 'http://www.google.com/search?#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Uri('www.google.com/search#anchor'), 'http://www.google.com/search#anchor');
fireunit.compare('http://www.google.com/#anchor', new Uri('www.google.com/#anchor'), 'http://www.google.com/#anchor');
fireunit.compare('http://www.google.com#anchor', new Uri('www.google.com#anchor'), 'http://www.google.com#anchor');

fireunit.compare('http://www.google.com', new Uri('http://www.google.com'), 'http://www.google.com');
fireunit.compare('http://www.google.com/', new Uri('http://www.google.com/'), 'http://www.google.com/');
fireunit.compare('http://www.google.com/', new Uri('http://www.google.com/?'), 'http://www.google.com/?');
fireunit.compare('http://www.google.com/search', new Uri('http://www.google.com/search'), 'http://www.google.com/search');
fireunit.compare('http://www.google.com/search?q=test', new Uri('http://www.google.com/search?q=test'), 'http://www.google.com/search?q=test');
fireunit.compare('http://www.google.com/search?q=test#anchor', new Uri('http://www.google.com/search?q=test#anchor'), 'http://www.google.com/search?q=test#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Uri('http://www.google.com/search?#anchor'), 'http://www.google.com/search?#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Uri('http://www.google.com/search#anchor'), 'http://www.google.com/search#anchor');
fireunit.compare('http://www.google.com/#anchor', new Uri('http://www.google.com/#anchor'), 'http://www.google.com/#anchor');
fireunit.compare('http://www.google.com#anchor', new Uri('http://www.google.com#anchor'), 'http://www.google.com#anchor');

var url = new Uri('www.google.com:443');
fireunit.compare('https', url.scheme, 'Url: Correctly detected scheme is https from port (www.google.com:443)');


fireunit.ok(jsOAuth.Service.Dummy, 'jsOAuth.Service.Dummy is a class');

var jsOAuthDummy = jsOAuth.Service.Dummy(key, secret, null);
fireunit.ok(jsOAuthDummy instanceof jsOAuth.Service.Dummy, 'jsOAuthDummy instanceof jsOAuth.Service.Dummy');

fireunit.ok(jsOAuthDummy.getRequestToken, 'jsOAuthDummy has getRequestToken method');
fireunit.ok(jsOAuthDummy.requestAuthorization, 'jsOAuthDummy has requestAuthorization method');
fireunit.ok(jsOAuthDummy.getAccessToken, 'jsOAuthDummy has getAccessToken method');

jsOAuthDummy.getRequestToken();

fireunit.testDone();
console.log ('Time spent: ' + ((new Date).getTime() - time_start) / 1000 + 'secs')
