module.exports = {
    test: function () { return window !== undefined && !!window.XMLHttpRequest; },
    factory: function () { return new window.XMLHttpRequest(); }
};