"use strict";
exports.__esModule = true;
var NextStrategy_1 = require("./strategies/NextStrategy");
var RefundStrategy_1 = require("./strategies/RefundStrategy");
var NewState_1 = require("./states/NewState");
var CloseState_1 = require("./states/CloseState");
var RefundState_1 = require("./states/RefundState");
var DeployState_1 = require("./states/DeployState");
var PendingState_1 = require("./states/PendingState");
var ProcessingState_1 = require("./states/ProcessingState");
var ServiceContext = (function () {
    function ServiceContext(entity, action) {
        this.STATUS_NEW = 'new';
        this.STATUS_PROCESSING = 'processing';
        this.STATUS_PENDING = 'pending';
        this.STATUS_DEPLOY = 'deploy';
        this.STATUS_REFUND = 'refund';
        this.STATUS_CLOSE = 'close';
        this.ACTION_NEXT = 'close';
        this.ACTION_REFUND = 'refund';
        this.ACTION_CLOSE = 'close';
        this._state = this.getStateFromEntity(entity);
        this._strategy = new NextStrategy_1.NextStrategy;
        this._action = action;
    }
    ServiceContext.prototype.getStateFromEntity = function (entity) {
        var _this = this;
        switch (entity.status) {
            case this.STATUS_PROCESSING:
                return new ProcessingState_1.ProcessingState(_this);
                break;
            case this.STATUS_PENDING:
                return new PendingState_1.PendingState(_this);
                break;
            case this.STATUS_DEPLOY:
                return new DeployState_1.DeployState(_this);
                break;
            case this.STATUS_REFUND:
                return new RefundState_1.RefundState(_this);
                break;
            case this.STATUS_CLOSE:
                return new CloseState_1.CloseState(_this);
                break;
            case this.STATUS_NEW:
            default:
                return new NewState_1.NewState(_this);
                break;
        }
    };
    ServiceContext.prototype.run = function () {
        switch (this._action) {
            case this.ACTION_REFUND:
                this.setStrategy(new RefundStrategy_1.RefundStrategy);
                this.next();
                break;
            case this.ACTION_CLOSE:
                this.close();
                break;
            case this.ACTION_NEXT:
            default:
                this.setStrategy(new NextStrategy_1.NextStrategy);
                this.next();
                break;
        }
        return this.getStatus();
    };
    ServiceContext.prototype.next = function () {
        this._strategy.execute(this._state);
    };
    ServiceContext.prototype.close = function () {
        this._state.close();
    };
    ServiceContext.prototype.setStrategy = function (strategy) {
        this._strategy = strategy;
    };
    ServiceContext.prototype.setState = function (state) {
        this._state = state;
    };
    ServiceContext.prototype.setStatus = function (status) {
        this._status = status;
    };
    ServiceContext.prototype.getStatus = function () {
        return this._status;
    };
    return ServiceContext;
}());
exports.ServiceContext = ServiceContext;
