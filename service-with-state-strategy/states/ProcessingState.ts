import { AbstractState } from './AbstractState';
import { CloseState } from './CloseState';
import { PendingState } from './PendingState';
import { STATUS_CLOSE, STATUS_PENDING } from '../status-constants';

export class ProcessingState extends AbstractState {
    next() {
        this._context.Status = STATUS_PENDING;
        this._context.State = new PendingState(this._context);
    }
    close() {
        this._context.Status = STATUS_CLOSE;
        this._context.State = new CloseState(this._context);
    }
}