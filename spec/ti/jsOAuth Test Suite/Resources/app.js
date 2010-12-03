
Titanium.include('jsOAuth-0.7.4.min.js');
var window =  Ti.UI.createWindow();

var oauth = OAuth({
	consumerKey: 'ba9df9055c77f338',
	consumerSecret: '846ffe1ec3b18989e73fe7fff833'
});

oauth.get('http://oauth-sandbox.sevengoslings.net/two_legged', function (data) {
	Titanium.API.info(data);
});

window.open();
