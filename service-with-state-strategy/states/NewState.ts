import { AbstractState } from './AbstractState';
import { ProcessingState } from './ProcessingState';
import { STATUS_PROCESSING } from '../status-constants';

export class NewState extends AbstractState {
    next() {
        this._context.Status = STATUS_PROCESSING;
        this._context.State = new ProcessingState(this._context);
    }
}