"use strict";
exports.__esModule = true;
var NextStrategy = (function () {
    function NextStrategy() {
    }
    NextStrategy.prototype.execute = function (state) {
        state.next();
    };
    return NextStrategy;
}());
exports.NextStrategy = NextStrategy;
