import { AbstractState } from './AbstractState';
import { CloseState } from './CloseState';
import { STATUS_CLOSE } from '../status-constants';

export class RefundState extends AbstractState {
    close() {
        this._context.Status = STATUS_CLOSE;
        this._context.State = new CloseState(this._context);
    }
}