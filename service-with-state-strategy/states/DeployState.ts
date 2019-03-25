import { AbstractState } from './AbstractState';
import { RefundState } from './RefundState';

export class DeployState extends AbstractState {
    refund() {
        this._context.setStatus(this._context.STATUS_REFUND);
        this._context.setState(new RefundState(this._context));
    }
    close() {}
    next() {}
}