import { AbstractState } from './AbstractState';
import { DeployState } from './DeployState';
import { RefundState } from './RefundState';

export class PendingState extends AbstractState {
    next() {
        this._context.setStatus(this._context.STATUS_DEPLOY);
        this._context.setState(new DeployState(this._context));
    }
    refund() {
        this._context.setStatus(this._context.STATUS_REFUND);
        this._context.setState(new RefundState(this._context));
    }
    close() {}
}