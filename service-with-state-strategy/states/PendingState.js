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
var DeployState_1 = require("./DeployState");
var RefundState_1 = require("./RefundState");
var PendingState = (function (_super) {
    __extends(PendingState, _super);
    function PendingState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PendingState.prototype.next = function () {
        this._context.setStatus(this._context.STATUS_DEPLOY);
        this._context.setState(new DeployState_1.DeployState(this._context));
    };
    PendingState.prototype.refund = function () {
        this._context.setStatus(this._context.STATUS_REFUND);
        this._context.setState(new RefundState_1.RefundState(this._context));
    };
    PendingState.prototype.close = function () { };
    return PendingState;
}(AbstractState_1.AbstractState));
exports.PendingState = PendingState;
