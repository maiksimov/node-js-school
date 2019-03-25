"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractState_1 = require("./AbstractState");
var CloseState_1 = require("./CloseState");
var RefundState = (function (_super) {
    __extends(RefundState, _super);
    function RefundState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RefundState.prototype.close = function () {
        this._context.setStatus(this._context.STATUS_CLOSE);
        this._context.setState(new CloseState_1.CloseState(this._context));
    };
    RefundState.prototype.next = function () { };
    RefundState.prototype.refund = function () { };
    return RefundState;
}(AbstractState_1.AbstractState));
exports.RefundState = RefundState;
