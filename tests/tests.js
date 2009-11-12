if (!fireunit) {
    throw new Error('FireUnit is required for unit testing.See http://fireunit.org/'); //http://fireunit.org/
}

fireunit.ok(Url, 'Url is a class');

// Only testing absolute Urls

fireunit.ok(new Url('www.google.com'), 'www.google.com');
fireunit.ok(new Url('www.google.com/'), 'www.google.com/');
fireunit.ok(new Url('www.google.com/?'), 'www.google.com/?');
fireunit.ok(new Url('www.google.com/search'), 'www.google.com/search');
fireunit.ok(new Url('www.google.com/search?q=test'), 'http://www.google.com/search?q=test');
fireunit.ok(new Url('www.google.com/search?q=test#anchor'), 'http://www.google.com/search?q=test#anchor');
fireunit.ok(new Url('www.google.com/search?#anchor'), 'http://www.google.com/search?#anchor');
fireunit.ok(new Url('www.google.com/search#anchor'), 'http://www.google.com/search#anchor');
fireunit.ok(new Url('www.google.com/#anchor'), 'http://www.google.com/#anchor');
fireunit.ok(new Url('www.google.com#anchor'), 'http://www.google.com#anchor');

fireunit.ok(new Url('http://www.google.com'), 'http://www.google.com');
fireunit.ok(new Url('http://www.google.com/'), 'http://www.google.com/');
fireunit.ok(new Url('http://www.google.com/?'), 'http://www.google.com/?');
fireunit.ok(new Url('http://www.google.com/search'), 'http://www.google.com/search');
fireunit.ok(new Url('http://www.google.com/search?q=test'), 'http://www.google.com/search?q=test');
fireunit.ok(new Url('http://www.google.com/search?q=test#anchor'), 'http://www.google.com/search?q=test#anchor');
fireunit.ok(new Url('http://www.google.com/search?#anchor'), 'http://www.google.com/search?#anchor');
fireunit.ok(new Url('http://www.google.com/search#anchor'), 'http://www.google.com/search#anchor');
fireunit.ok(new Url('http://www.google.com/#anchor'), 'http://www.google.com/#anchor');
fireunit.ok(new Url('http://www.google.com#anchor'), 'http://www.google.com#anchor');

var url = new Url('www.google.com:443');
fireunit.compare('https', url.scheme, 'Url: Correctly detected scheme is https from port (www.google.com:443)');

fireunit.testDone();
