var Titanium;

module.exports = {
    test: function () { return !!Titanium && !!Titanium.Network.HTTPClient; },
    factory: function () { return new Titanium.Network.HTTPClient(); }
};