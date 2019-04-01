import { AbstractState } from './AbstractState';
import { DeployState } from './DeployState';
import { RefundState } from './RefundState';
import { STATUS_DEPLOY, STATUS_REFUND } from '../status-constants';

export class PendingState extends AbstractState {
    next() {
        this._context.Status = STATUS_DEPLOY;
        this._context.State = new DeployState(this._context);
    }
    refund() {
        this._context.Status = STATUS_REFUND;
        this._context.State = new RefundState(this._context);
    }
}