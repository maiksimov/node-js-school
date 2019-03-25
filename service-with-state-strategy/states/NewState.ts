import { AbstractState } from './AbstractState';
import { ProcessingState } from './ProcessingState';

export class NewState extends AbstractState {
    next() {
        this._context.setStatus(this._context.STATUS_PROCESSING);
        this._context.setState(new ProcessingState(this._context));
    }
    refund() {}
    close() {}
}