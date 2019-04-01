import { AbstractState } from './AbstractState';
import { RefundState } from './RefundState';
import { STATUS_REFUND } from '../status-constants';

export class DeployState extends AbstractState {
    refund() {
        this._context.Status = STATUS_REFUND;
        this._context.State = new RefundState(this._context);
    }
}