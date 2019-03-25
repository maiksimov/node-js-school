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
var RefundState_1 = require("./RefundState");
var DeployState = (function (_super) {
    __extends(DeployState, _super);
    function DeployState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeployState.prototype.refund = function () {
        this._context.setStatus(this._context.STATUS_REFUND);
        this._context.setState(new RefundState_1.RefundState(this._context));
    };
    DeployState.prototype.close = function () { };
    DeployState.prototype.next = function () { };
    return DeployState;
}(AbstractState_1.AbstractState));
exports.DeployState = DeployState;
