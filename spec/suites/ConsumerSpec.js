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

asyncTest("OAuth URL query params and data request", function() {
    var oauth = OAuth({
		enablePrivilege: false,
		consumerKey: 'ba9df9055c77f338',
		consumerSecret: '846ffe1ec3b18989e73fe7fff833'
    });
    oauth.request({
    	url: 'http://oauth-sandbox.sevengoslings.net/two_legged?param1=parameter',
    	data: {
    		status: 'test'
    	},
    	success: function (data) {
	        start();
	        equals(data.text, 'SUCCESS! This is a 2-legged call from the `jsOAuth2` consumer which was made by `bytespider`.', 'Request success');
	    }
    });
});


asyncTest("OAuth 2-Legged Request", function() {
    var oauth = OAuth({
        enablePrivilege: false,
        consumerKey: 'ba9df9055c77f338',
        consumerSecret: '846ffe1ec3b18989e73fe7fff833'
    });
    oauth.get('http://oauth-sandbox.sevengoslings.net/two_legged', function (data) {
        start();
        equals(data.text, 'SUCCESS! This is a 2-legged call from the `jsOAuth2` consumer which was made by `bytespider`.', 'Request success');
    });
});

asyncTest("OAuth 3-Legged Request", function() {
    var oauth = OAuth({
        enablePrivilege: false,
        consumerKey: 'ba9df9055c77f338',
        consumerSecret: '846ffe1ec3b18989e73fe7fff833',
        
        realm: 'http://oauth-sandbox.sevengoslings.net',
        requestTokenUrl: 'http://oauth-sandbox.sevengoslings.net/request_token',
        authorizationUrl: 'http://oauth-sandbox.sevengoslings.net/authorize',
        accessTokenUrl: 'http://oauth-sandbox.sevengoslings.net/access_token'
    });
    
    oauth.fetchRequestToken(function (url) {
    	var windowObjectReference = window.open(url, 'authorise');


        var mask = document.createElement('div');
        mask.setAttribute('id', 'mask');
        mask.innerHTML = '<div id="start-app" class="popup"><p>Once you have logged in and authorized this application with your browser, please enter the provided code and click the button below.</p><input type="text" id="verification" placeholder="enter code"><input id="start-app-button" type="button" value="Start application"></div>';


        document.body.appendChild(mask);
        
		var button = document.getElementById('start-app-button');
        button.onclick = function() {
            var code = document.getElementById('verification').value;
            oauth.setVerifier(code);
            
            oauth.fetchAccessToken(function(data){
    	    	ok(true);
				start();
				
            	console.log(data);
            }, function (data) {console.log(data)});
        };
    }, function (data) {console.log(data)});
});
