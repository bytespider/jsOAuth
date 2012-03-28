var OAuthRequest = require("../../src/OAuth/Request/Request");

function isInstanceOf(value, expected) { return value instanceof expected; }
function isDefined(value) { return value != null; }

exports.basic = function (test) {
    test.expect(2);
    test.ok(isDefined(OAuthRequest), "OAuthRequest is defined");

    var xhr = new OAuthRequest();
    var console;
    if (console !== undefined) {
        console.log(xhr);
    }
    test.ok(isInstanceOf(xhr, OAuthRequest), "xhr is an instance of OAuthRequest");

    test.done();
};

exports.request = function (test) {
    test.expect(1);

    var xhr = new OAuthRequest();
    xhr.open("GET", "http://www.google.co.uk", true);

    xhr.addEventListener("readystatechange", function (event) {
        if (this.readyState === this.DONE && this.status >= 200)
        {
            test.ok(true, "Request completed");
            test.done();
        }
    });

    xhr.send(null);
};

exports.signedRequest = function (test) {
    test.expect(1);
    var env = require("../env");
    var xhr = new OAuthRequest();

    xhr.applicationKey = env.twitter.applicationKey;
    xhr.applicationSecret = env.twitter.applicationSecret;
    xhr.accessTokenKey = env.twitter.accessTokenKey;
    xhr.accessTokenSecret = env.twitter.accessTokenSecret;

    xhr.open("GET", "http://api.twitter.com/1/statuses/home_timeline.json", true);

    xhr.addEventListener("readystatechange", function (event) {
        if (this.readyState === this.DONE && this.status >= 200)
        {
            test.ok(true, "Request completed");
            test.done();
        }
    });

    xhr.send(null);
};

/*
describe("OAuth2.0 XMLHttpRequest", function () {
    it("Should exist", function () {
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
*/