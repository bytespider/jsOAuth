if (!fireunit) {
    throw new Error('FireUnit is required for unit testing.See http://fireunit.org/'); //http://fireunit.org/
}

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

fireunit.testDone();
