"use strict";
exports.__esModule = true;
var stream_1 = require("stream");
var UpperCase = new stream_1.Transform({
    transform: function (chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});
exports.UpperCase = UpperCase;
var LowerCase = new stream_1.Transform({
    transform: function (chunk, encoding, callback) {
        callback(null, chunk.toString().toLowerCase());
    }
});
exports.LowerCase = LowerCase;
var RemoveSpaces = new stream_1.Transform({
    transform: function (chunk, encoding, callback) {
        callback(null, chunk.toString().replace(/\s+/g, ''));
    }
});
exports.RemoveSpaces = RemoveSpaces;
