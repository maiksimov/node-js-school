import { AbstractState } from './AbstractState';
import { CloseState } from './CloseState';
import { PendingState } from './PendingState';

export class ProcessingState extends AbstractState {
    next() {
        this._context.setStatus(this._context.STATUS_PENDING);
        this._context.setState(new PendingState(this._context));
    }
    close() {
        this._context.setStatus(this._context.STATUS_CLOSE);
        this._context.setState(new CloseState(this._context));
    }
    refund() {}
}