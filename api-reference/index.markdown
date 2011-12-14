---
layout: default
title: "API Reference"
description: "API reference guide and manual"
---

jsOAuth is a Javascript implimentation of the OAuth protocol.

##OAuth##
Creates an OAuth object which signs and makes requests. You must so this first, 
as all other calls depend on the object method creates.

###Parameters###
1. config <span class="type">object</span>

The following config parameters can be set.

<table>
	<thead>
		<tr>
			<th>Parameter</th><th>Type</th><th>Required</th><th>Default</th><th>Notes</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>consumerKey</td><td>string</td><td>true</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>consumerSecret</td><td>string</td><td>true</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>callbackUrl</td><td>string</td><td>&nbsp;</td><td>oob</td><td><p>Sets the callback url for authorisation. OOB is used for PIN based auth</p></td>
		</tr>
		<tr>
			<td>accessTokenKey</td><td>string</td><td>&nbsp;</td><td>&nbsp;</td><td><p>Some services give you an access token so you can skip the OAuth dance</p></td>
		</tr>
		<tr>
			<td>accessTokenSecret</td><td>string</td><td>Required if 'accessTokenKey' was set</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>signatureMethod</td><td>string</td><td>&nbsp;</td><td>HMAC-SHA1</td><td>jsOAuth only supports HMAC-SHA1</td>
		</tr>
		<tr>
			<td>realm</td><td>string</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>requestTokenUrl</td><td>string</td><td>Required for 3-legged requests</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>authorizationUrl</td><td>string</td><td>Required for 3-legged requests</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>accessTokenUrl</td><td>string</td><td>Required for 3-legged requests</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td><strike>enablePrivilege</strike></td><td>boolean</td><td>&nbsp;</td><td>false</td><td><strong>Deprecated</strong> Allows you to put Firefox into a Cross domain requests enabled mode<sup>*</sup></td>
		</tr>
	</tbody>
</table>

<sub>* Should only be used for testing</sub>

###Usage###
{% highlight javascript linenos %}
var config = {
    consumerKey: "MY-KEY",
    consumerSecret: "MY-SECRET"
};

var oauth = OAuth(config);
{% endhighlight %}

##get##
Performs a GET request

###Parameters###
1. url <span class="type">string</span>
2. success <span class="type">function</span>
3. failure <span class="type">function</span>

###Usage###
{% highlight javascript linenos %}
function success(data) {
	alert('Success ' + data.text);
}

function failure(data) {
	alert('Something bad happened! :(');
}
		
oauth.get('http://www.example.com/person/1', success, failure);
{% endhighlight %}

##post##
Performs a POST request

###Parameters###
1. url <span class="type">string</span>
2. data <span class="type">object</span>
3. success <span class="type">function</span>
4. failure <span class="type">function</span>

###Usage###
{% highlight javascript linenos %}
function success(data) {
	alert('Success ' + data.text);
}

function failure(data) {
	alert('Something bad happened! :(');
}

var data = {
	name: 'Darth Vader',
	age: 43
};
		
oauth.post('http://www.example.com/person/edit/1', data, success, failure);
{% endhighlight %}

##getJSON##
Performs a GET request and parses JSON. Requires a JSON library

###Parameters###
1. url <span class="type">string</span>
2. success <span class="type">function</span>
3. failure <span class="type">function</span>

###Usage###
{% highlight javascript linenos %}
function success(data_object) {
	alert('Name: ' + data_object.name);
}

function failure(data) {
	alert('Something bad happened! :(');
}
		
oauth.getJSON('http://www.example.com/person/1', success, failure);
{% endhighlight %}

##postJSON##
Performs a POST request and parses JSON. The post data is stringified using JSON.stringify, then posted as the request body. Requires a JSON library

###Parameters###
1. url <span class="type">string</span>
2. data <span class="type">object</span>
3. success <span class="type">function</span>
4. failure <span class="type">function</span>

###Usage###
{% highlight javascript linenos %}
function success(data_object) {
	alert('Name: ' + data_object.name);
}

function failure(data) {
	alert('Something bad happened! :(');
}
		
oauth.postJSON('http://www.example.com/person/1', {
	'name': 'Luke Skywalker',
	'age': '18'
}, success, failure);
{% endhighlight %}

##request##
Performs a request based on the configuration you give. More flexible than the 
previous request methods as you can specify additional headers.

###Parameters###
1. options <span class="type">object</span>

<table>
	<thead>
		<tr>
			<th>Parameter</th><th>Type</th><th>Required</th><th>Default</th><th>Notes</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>method</td><td>string</td><td>&nbsp;</td><td>GET</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>url</td><td>string</td><td>true</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>data</td><td>object</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>headers</td><td>object</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>success</td><td>function</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
		<tr>
			<td>failure</td><td>function</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
		</tr>
	</tbody>
</table>

###Usage###
{% highlight javascript linenos %}
function success(data) {
	alert('Name: ' + data.text);
}

function failure(data) {
	alert('Something bad happened! :(');
}

var options = {
	method: 'POST';
	url: 'http://www.example.com/person/edit/2',
	success: success,
	failure: failure,
	headers: {
		'X-Do-Not-Track': 1
	},
	data: {
		'name': 'Luke Skywalker',
		'age': '18'
	}
};
		
oauth.request(options);
{% endhighlight %}

##fetchRequestToken##
Gets the request token from the OAuth service URL specified with the `requestTokenUrl` 
finally passing `authorizationUrl` and the request token string to the success callback.

###Parameters###
1. success <span class="type">function</span>
2. failure <span class="type">function</span>

###Usage###
{% highlight javascript linenos %}
oauth.fetchRequestToken(function (url) {
	var windowObjectReference = window.open(url, 'authorise');
}, function (data) {
	console.log(data)
});
{% endhighlight %}

##getVerifier##
Get the verifier that was previously set in this session

###Usage###
{% highlight javascript linenos %}
var pin = oauth.getVerifier();
{% endhighlight %}

##setVerifier##
After you open the authorisation window, you need to get the user to input the PIN
givent to them by the service. You then set it with the `setVerifier()` method.

###Parameters###
1. verifier <span class="type">string</span>

###Usage###
{% highlight javascript linenos %}
var code = document.getElementById('verification').value;
oauth.setVerifier(code);
{% endhighlight %}

##fetchAccessToken##
Gets the access token from the OAuth service URL specified with the `accessTokenUrl`.
The access token is parsed and stored. A call to `getAccessToken()` can retrive 
the parsed token.

###Parameters###
1. success <span class="type">function</span>
2. failure <span class="type">function</span>

###Usage###
{% highlight javascript linenos %}
oauth.fetchAccessToken(function (data) {
	console.log('Authorised for 3-legged requests from now on');
}, function (data) {
	console.log(data)
});
{% endhighlight %}

##getAccessToken##
Gets the stored access token 

###Usage###
{% highlight javascript linenos %}
var accessToken = oauth.getAccessToken();
{% endhighlight %}

##getAccessTokenKey##
Gets the stored access token key

###Usage###
{% highlight javascript linenos %}
var accessTokenKey = oauth.getAccessTokenKey();
{% endhighlight %}

##getAccessTokenSecret##
Gets the stored access token secret

###Usage###
{% highlight javascript linenos %}
var accessTokenSecret = oauth.getAccessTokenSecret();
{% endhighlight %}

##setAccessToken##
Sets an access token for signing requests

###Parameters###
1. tokenKey <span class="type">string</span>
2. tokenSecret <span class="type">string</span>

###Usage###
{% highlight javascript linenos %}
oauth.setAccessToken('MY-ACCESS-KEY', 'MY-ACCESS-SECRET');
{% endhighlight %}