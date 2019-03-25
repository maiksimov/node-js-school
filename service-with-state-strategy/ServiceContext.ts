
import { Strategy } from './strategies/interfaces/Strategy';
import { NextStrategy } from './strategies/NextStrategy';
import { RefundStrategy } from './strategies/RefundStrategy';
import { Context } from './Context';
import { State } from './states/interfaces/State';
import { NewState } from './states/NewState';
import { CloseState } from './states/CloseState';
import { RefundState } from './states/RefundState';
import { DeployState } from './states/DeployState';
import { PendingState } from './states/PendingState';
import { ProcessingState } from './states/ProcessingState';

export class ServiceContext implements Context {
    private _state;
    private _strategy;
    private _status;
    private _action;

    private STATUS_NEW = 'new';
    private STATUS_PROCESSING = 'processing';
    private STATUS_PENDING = 'pending';
    private STATUS_DEPLOY = 'deploy';
    private STATUS_REFUND = 'refund';
    private STATUS_CLOSE = 'close';

    private ACTION_NEXT = 'close';
    private ACTION_REFUND = 'refund';
    private ACTION_CLOSE = 'close';

    constructor (entity, action: string) {
        this._state = this.getStateFromEntity(entity);
        this._strategy = new NextStrategy;
        this._action = action;
    }

    getStateFromEntity(entity) {
        const _this = this;
        switch (entity.status) {
            case this.STATUS_PROCESSING:
                return new ProcessingState(_this);
                break;
            case this.STATUS_PENDING:
                return new PendingState(_this);
                break;
            case this.STATUS_DEPLOY:
                return new DeployState(_this);
                break;
            case this.STATUS_REFUND:
                return new RefundState(_this);
                break;
            case this.STATUS_CLOSE:
                return new CloseState(_this);
                break;
            case this.STATUS_NEW:
            default:
                return new NewState(_this);
                break;
        }
    }

    run(): string {
        switch (this._action) {
            case this.ACTION_REFUND:
                this.setStrategy(new RefundStrategy);
                this.next();
                break;
            case this.ACTION_CLOSE:
                this.close();
                break;
            case this.ACTION_NEXT:
            default:
                this.setStrategy(new NextStrategy);
                this.next();
                break;
        }
        return this.getStatus();
    }

    next() {
        this._strategy.execute(this._state);
    }

    close() {
        this._state.close();
    }

    setStrategy(strategy: Strategy) {
        this._strategy = strategy;
    }

    setState(state: State) {
        this._state = state;
    }

    setStatus(status: string) {
        this._status = status;
    }

    getStatus() {
        return this._status;
    }
}