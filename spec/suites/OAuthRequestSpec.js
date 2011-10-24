module('OAuth Consumer');
test('XHR compatability', function () {
    ok(OAuthRequest !== undefined, 'Global object exists');

    var xhr = new OAuthRequest();
    ok(xhr instanceof OAuthRequest);
});

asyncTest("Request a page", function() {
    var xhr = new OAuthRequest();
    xhr.open('GET', 'http://www.google.co.uk', true);

    xhr.addEventListener('readystatechange', function (event) {
        if (this.readyState == this.DONE && this.status >= 200)
        {
            start();
        }
    });

    xhr.send(null);
});

asyncTest("Request a page using jQuery.ajax", function() {
    var xhr = new OAuthRequest();
    ok(xhr instanceof OAuthRequest);

    jQuery.ajaxSettings.xhr =  function () { return new OAuthRequest };
    $.ajax("http://www.google.co.uk", {success: function (data, textStatus, jqXHR) {
        start();
    }});
});

asyncTest("Request the authenticated users's timeine", function() {
    var xhr = new OAuthRequest();
    ok(xhr instanceof OAuthRequest);

    jQuery.ajaxSettings.xhr =  function () {
        var xhr =  new OAuthRequest;
        xhr.consumerKey = consumerKey;
        xhr.consumerSecret = consumerSecret;
        xhr.accessTokenKey = accessTokenKey;
        xhr.accessTokenSecret = accessTokenSecret;

        return xhr;
    };
    $.ajax("http://api.twitter.com/1/statuses/home_timeline.json", {success: function (data, textStatus, jqXHR) {
        console.log(data);
        start();
    }});
});

