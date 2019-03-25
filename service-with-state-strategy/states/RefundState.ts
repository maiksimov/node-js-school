import { AbstractState } from './AbstractState';
import { CloseState } from './CloseState';

export class RefundState extends AbstractState {
    close() {
        this._context.setStatus(this._context.STATUS_CLOSE);
        this._context.setState(new CloseState(this._context));
    }
    next() {}
    refund() {}
}