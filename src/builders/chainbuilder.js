"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var transformers_1 = require("../stream/transformers");
var fs = require("fs");
var zlib = require("zlib");
var crypto = require("crypto");
var ChainBuilder = (function () {
    function ChainBuilder(stream, filename, pipeline) {
        this._stream = stream;
        this._pipeline = pipeline;
        this._filename = filename;
    }
    ChainBuilder.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                _this = this;
                this._chain = this._pipeline.steps.reduce(function (chain, step) {
                    return _this[step](chain);
                }, this._stream);
                this._chain.pipe(fs.createWriteStream(this._filename)).on('finish', function () { console.log('Done'); });
                return [2 /*return*/, { filename: this._filename, file: this._chain }];
            });
        });
    };
    ChainBuilder.prototype.upperCase = function (chain) {
        return chain.pipe(transformers_1.UpperCase);
    };
    ChainBuilder.prototype.lowerCase = function (chain) {
        return chain.pipe(transformers_1.LowerCase);
    };
    ChainBuilder.prototype.removeSpaces = function (chain) {
        return chain.pipe(transformers_1.RemoveSpaces);
    };
    ChainBuilder.prototype.gzip = function (chain) {
        this._filename += '.gz';
        return chain.pipe(zlib.createGzip());
    };
    ChainBuilder.prototype.ungzip = function (chain) {
        this._filename = this._filename.replace(/\.gz/i, '');
        return chain.pipe(zlib.createUnzip());
    };
    ChainBuilder.prototype.encrypt = function (chain) {
        var cipher = crypto.createCipher('aes192', 'password');
        this._filename += '.enc';
        return chain.pipe(cipher);
    };
    ChainBuilder.prototype.decrypt = function (chain) {
        var decipher = crypto.createDecipher('aes192', 'password');
        this._filename = this._filename.replace(/\.enc/i, '');
        return chain.pipe(decipher);
    };
    return ChainBuilder;
}());
exports.ChainBuilder = ChainBuilder;
