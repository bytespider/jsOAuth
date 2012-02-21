beforeEach(function() {
    this.addMatchers({
        toBeInstanceOf: function(type) {
            return this.actual instanceof type;
        }
    })
});

describe('OAuth XMLHttpRequest', function () {
    it('Should exist', function () {
        var OAuthRequest = window.OAuthRequest;

        expect(OAuthRequest).toBeDefined();

        var xhr = new OAuthRequest;
        expect(xhr).toBeInstanceOf(OAuthRequest);
    });

    it("Should request a page", function() {
        var xhr = new OAuthRequest(),
            done = false;

        xhr.open('GET', 'http://www.google.co.uk', true);

        xhr.addEventListener('readystatechange', function (event) {
            if (this.readyState == this.DONE && this.status >= 200)
            {
                done = true;
            }
        });

        waitsFor(function () {
            return done;
        }, "Request never completed", 10000);

        xhr.send(null);
    });

    it("Should request a page using jQuery.ajax", function() {
        var xhr = new OAuthRequest(),
            done = false;

        waitsFor(function () {
            return done;
        }, "Requet never completed", 10000);

        jQuery.ajaxSettings.xhr =  function () { return new OAuthRequest };
        $.ajax("http://www.google.co.uk", {success: function (data, textStatus, jqXHR) {
            done = true;
        }});
    });

    it("Should request the authenticated users's timeine", function() {
        var xhr = new OAuthRequest(),
            done = true;

        jQuery.ajaxSettings.xhr =  function () {
            var xhr =  new OAuthRequest;
            xhr.applicationKey = applicationKey;
            xhr.applicationSecret = applicationSecret;
            xhr.accessTokenKey = accessTokenKey;
            xhr.accessTokenSecret = accessTokenSecret;

            return xhr;
        };

        waitsFor(function () {
            return done;
        }, "Request never completed", 10000);

        $.ajax("http://api.twitter.com/1/statuses/home_timeline.json", {success: function (data, textStatus, jqXHR) {
            done = true;
        }});
    });

});

describe('OAuth2.0 XMLHttpRequest', function () {
    it('Should exist', function () {
        var OAuthRequest = window.OAuthRequest;

        expect(OAuthRequest).toBeDefined();

        var xhr = new OAuthRequest;
        expect(xhr).toBeInstanceOf(OAuthRequest);
    });

    var xhr = new OAuthRequest(),
            done = true;

        jQuery.ajaxSettings.xhr =  function () {
            var xhr =  new OAuthRequest;
            xhr.applicationKey = applicationKey;
            xhr.applicationSecret = applicationSecret;
            xhr.accessTokenKey = accessTokenKey;
            xhr.accessTokenSecret = accessTokenSecret;

            return xhr;
        };

        waitsFor(function () {
            return done;
        }, "Request never completed", 10000);

        $.ajax("https://graph.facebook.com/oauth/access_token?client_id=" + applicationKey + "&client_secret=" + applicationSecret + "&grant_type=client_credentials", {success: function (data, textStatus, jqXHR) {
            done = true;
        }});
});