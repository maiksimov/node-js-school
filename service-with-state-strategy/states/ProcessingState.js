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
var PendingState_1 = require("./PendingState");
var ProcessingState = (function (_super) {
    __extends(ProcessingState, _super);
    function ProcessingState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessingState.prototype.next = function () {
        this._context.setStatus(this._context.STATUS_PENDING);
        this._context.setState(new PendingState_1.PendingState(this._context));
    };
    ProcessingState.prototype.close = function () {
        this._context.setStatus(this._context.STATUS_CLOSE);
        this._context.setState(new CloseState_1.CloseState(this._context));
    };
    ProcessingState.prototype.refund = function () { };
    return ProcessingState;
}(AbstractState_1.AbstractState));
exports.ProcessingState = ProcessingState;
