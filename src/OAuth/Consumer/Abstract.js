var VERSION = '1.0';
var SIGNATURE_METHOD = 'PLAINTEXT';

function OAuthConsumerAbstract(key, secret, callback_url, token, token_secret) {}

OAuthConsumerAbstract.prototype = {
    init: function(key, secret, callback_url, token, token_secret){},
    
    key: '',
    secret: '',
    token: '',
    token_secret: '',
    
    signature: '',
    signature_method: '',
    
    realm: '',
    accessTokenUrl: '',
    authenticationUrl: '',
    authorizationUrl: '',
    requestTokenUrl: '',
    
    authenticateAccess: function(){},
    
    requestToken: function(){},
    authorize: function(){},
    
    signRequest: function(){},
    
    getNonce: function(){},
    getTimestamp: function(){}
};
