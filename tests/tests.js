var time_start = (new Date).getTime();

if (!fireunit) {
    throw new Error('FireUnit is required for unit testing.See http://fireunit.org/'); //http://fireunit.org/
}

fireunit.ok(typeof jsOAuth == 'function', 'jsOAuth is a constructor');

var key = 'dj0yJmk9QUpHMUQyeWZabGNRJmQ9WVdrOVNHTnFRVk5WTm1jbWNHbzlOakEyT1RNNE5qSXgmcz1jb25zdW1lcnNlY3JldCZ4PThh';
var secret = 'a845eb87bde903d230dfa1cf6e106e7891447bab';
var app_id = 'HcjASU6g';

// CONSTANTS
fireunit.compare('1.0',		jsOAuth.OAUTH_VERSION,		'jsOAuth.OAUTH_VERSION');

var consumer = new jsOAuth(key, secret);
fireunit.ok(consumer instanceof jsOAuth, 'consumer typeof jsOAuth');

fireunit.compare(key,	consumer.key,	'consumer.key = dj0yJmk9QUpHMUQyeWZabGNRJmQ9WVdrOVNHTnFRVk5WTm1jbWNHbzlOakEyT1RNNE5qSXgmcz1jb25zdW1lcnNlY3JldCZ4PThh');
fireunit.compare(secret,consumer.secret,'consumer.secret = a845eb87bde903d230dfa1cf6e106e7891447bab');
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
nonce_list = null, nonce_a = null, nonce_b = null;

fireunit.ok(consumer.getRequestToken,'consumer.getRequestToken is method');
consumer.getRequestToken()

// test url generation
fireunit.compare(
    'This%20string%20has%20spaces%2Astars%2F%5Cslashes%22quotes%3Acolons.periods%3Dequals%26ampersands', 
    Uri.QueryString.urlEncode('This string has spaces*stars/\\slashes"quotes:colons.periods=equals&ampersands'),
    'urlEncode encodes string correctly'
);

var request = new consumer.Request('www.example.com', jsOAuth.HTTP_METHOD_GET, {});


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

connection.send();

/*
fireunit.ok(typeof Url == 'function', 'Url is a constructor');

// Only testing absolute Urls
fireunit.compare('http://www.google.com', new Url('www.google.com'), 'www.google.com');
fireunit.compare('http://www.google.com/', new Url('www.google.com/'), 'www.google.com/');
fireunit.compare('http://www.google.com/', new Url('www.google.com/?'), 'www.google.com/?');
fireunit.compare('http://www.google.com/search', new Url('www.google.com/search'), 'www.google.com/search');
fireunit.compare('http://www.google.com/search?q=test', new Url('www.google.com/search?q=test'), 'http://www.google.com/search?q=test');
fireunit.compare('http://www.google.com/search?q=test#anchor', new Url('www.google.com/search?q=test#anchor'), 'http://www.google.com/search?q=test#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Url('www.google.com/search?#anchor'), 'http://www.google.com/search?#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Url('www.google.com/search#anchor'), 'http://www.google.com/search#anchor');
fireunit.compare('http://www.google.com/#anchor', new Url('www.google.com/#anchor'), 'http://www.google.com/#anchor');
fireunit.compare('http://www.google.com#anchor', new Url('www.google.com#anchor'), 'http://www.google.com#anchor');

fireunit.compare('http://www.google.com', new Url('http://www.google.com'), 'http://www.google.com');
fireunit.compare('http://www.google.com/', new Url('http://www.google.com/'), 'http://www.google.com/');
fireunit.compare('http://www.google.com/', new Url('http://www.google.com/?'), 'http://www.google.com/?');
fireunit.compare('http://www.google.com/search', new Url('http://www.google.com/search'), 'http://www.google.com/search');
fireunit.compare('http://www.google.com/search?q=test', new Url('http://www.google.com/search?q=test'), 'http://www.google.com/search?q=test');
fireunit.compare('http://www.google.com/search?q=test#anchor', new Url('http://www.google.com/search?q=test#anchor'), 'http://www.google.com/search?q=test#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Url('http://www.google.com/search?#anchor'), 'http://www.google.com/search?#anchor');
fireunit.compare('http://www.google.com/search#anchor', new Url('http://www.google.com/search#anchor'), 'http://www.google.com/search#anchor');
fireunit.compare('http://www.google.com/#anchor', new Url('http://www.google.com/#anchor'), 'http://www.google.com/#anchor');
fireunit.compare('http://www.google.com#anchor', new Url('http://www.google.com#anchor'), 'http://www.google.com#anchor');

var url = new Url('www.google.com:443');
fireunit.compare('https', url.scheme, 'Url: Correctly detected scheme is https from port (www.google.com:443)');


var key = 'dj0yJmk9QUpHMUQyeWZabGNRJmQ9WVdrOVNHTnFRVk5WTm1jbWNHbzlOakEyT1RNNE5qSXgmcz1jb25zdW1lcnNlY3JldCZ4PThh';
var secret = 'a845eb87bde903d230dfa1cf6e106e7891447bab';
var app_id = 'HcjASU6g';

fireunit.ok(jsOAuth.Service.Yahoo, 'jsOAuth.Service.Yahoo is a class');

var jsOAuthYahoo = jsOAuth.Service.Yahoo(key, secret, null, app_id);
console.debug(jsOAuthYahoo);
fireunit.ok(jsOAuthYahoo, 'construct of jsOAuth.Service.Yahoo');

fireunit.ok(jsOAuthYahoo.getRequestToken, 'jsOAuth.Service.Yahoo has getRequestToken method');
fireunit.ok(jsOAuthYahoo.requestAuthorization, 'jsOAuth.Service.Yahoo has requestAuthorization method');
fireunit.ok(jsOAuthYahoo.getAccessToken, 'jsOAuth.Service.Yahoo has getAccessToken method');

console.debug(jsOAuthYahoo.getRequestToken());
//fireunit.ok(jsOAuthYahoo.getRequestToken(), 'jsOAuth.Service.Yahoo.getRequestToken() creates Request');
*/
fireunit.testDone();
console.log ('Time spent: ' + ((new Date).getTime() - time_start) / 1000 + 'secs')
