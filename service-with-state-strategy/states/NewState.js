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
var ProcessingState_1 = require("./ProcessingState");
var NewState = (function (_super) {
    __extends(NewState, _super);
    function NewState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewState.prototype.next = function () {
        this._context.setStatus(this._context.STATUS_PROCESSING);
        this._context.setState(new ProcessingState_1.ProcessingState(this._context));
    };
    NewState.prototype.refund = function () { };
    NewState.prototype.close = function () { };
    return NewState;
}(AbstractState_1.AbstractState));
exports.NewState = NewState;
