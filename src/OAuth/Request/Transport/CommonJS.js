module.exports = {
    test: function () { return !!require("../../../XMLHttpRequest").XMLHttpRequest; },
    factory: function () { var XMLHttpRequest = require("../../../XMLHttpRequest").XMLHttpRequest; return new XMLHttpRequest(); }
};