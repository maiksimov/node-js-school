"use strict";
exports.__esModule = true;
var RefundStrategy = (function () {
    function RefundStrategy() {
    }
    RefundStrategy.prototype.execute = function (state) {
        state.refund();
    };
    return RefundStrategy;
}());
exports.RefundStrategy = RefundStrategy;
