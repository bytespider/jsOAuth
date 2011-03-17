# jsOAuth - JavaScript OAuth library

jsOAuth is a javascript library implementing the OAuth protocol. jsOAuth aims to
form the basis of custom clients such as Twitter and  Yahoo.

Written in JavaScript, jsOAuth aims to be a fully featured open source OAuth library for use
in Adobe AIR, Appcelerator Titanium and PhoneGAP.
In fact, anywhere that javascript can be used and has cross-domain
XMLHttpRequests.

## Features

### Core

  * Single authorisation entry-point
  * Debug mode for testing locally in Firefox, see index.html for example

Released under the MIT. Please see LICENSE in the project root folder for more
information.

## Usage

Download the [minified library](https://github.com/downloads/bytespider/jsOAuth/jsOAuth-0.8.1.min.js) and include it in your html.

	<script type="text/javascript" src="library/jsOAuth-0.8.1.min.js"></script>

This gives you a global OAuth object for you to set up and make requests with.
Setting it up is simple.

    <script type="text/javascript">
        var oauth, options;

        options = {
            enablePrivilege: true,
            consumerKey: 'ba9df9055c77f338',
            consumerSecret: '846ffe1ec3b18989e73fe7fff833'
        };

        oauth = OAuth(options);
    </script>

*Note: **EnablePrivilege** lets you test jsOAuth in Firefox*
You can test in chrome using the following commandline `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --allow-file-access-from-files --allow-file-access --log-level 3`

You'll need to replace the consumer key and secret with your own. Once that is
done, you can make your authenticated 2-legged request.

    <script type="text/javascript">
        oauth.get('http://oauth-sandbox.sevengoslings.net/two_legged', function (data) {
            alert(data);
        });
    </script>

Hopefully the syntax will look familier to you, if you've any kind of javscript
framework such as jQuery.

**Please let me know if jsOAuth doesn't work for you or if you're application
requires something jsOAuth doesn't currently support. I'm always happy to hear your
suggestions. [feedback@bytespider.eu](mailto:feedback@bytespider.eu?subject=jsOAuth%20suggestion/feedback)**

If you like jsOAuth and want to see new features, [please donate](http://pledgie.com/campaigns/14219/).

## Further reading and tutorials
* [Tutorial: Titanium & jsOAuth - Part 1](http://code.bytespider.eu/post/3032429995/twitter-client-using-titanium-and-jsoauth-part-1)
* [Tutorial: Titanium & jsOAuth - Part 2](http://code.bytespider.eu/post/3088341182/twitter-client-using-titanium-and-jsoauth-part-2)
* [Tutorial: OAuth and PIN based authorization in Javascript](http://log.coffeesounds.com/oauth-and-pin-based-authorization-in-javascri)

If you have a tutorial you think should be included here, please email me with links.

## Building

To start developing, clone this repository and initialise the dependent git submodules by executing the following commands:

    git submodule init
    git submodule update

To build the entire library type `make` from the command line.

To build just the W3C compatible version, type `make jsoauth` from the command line.
To build just CommonJS/Node.JS compatible module type `make commonjs` from the command line.

All files are compiled into the dist directory.

To start over once you have already built a copy, type `make clean` to delete
all built distribution files

## Issues

Please report all issues on the GitHub [issue tracker for jsOauth](http://github.com/bytespider/jsOAuth/issues).

## Authors

  * Rob Griffiths (rob AT bytespider DOT eu)
