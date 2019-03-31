import { IState } from '../states/interfaces/IState';
import { IContext } from '../IContext';
import { IStateFactory } from './IStateFactory';
import { STATUS_NEW, STATUS_CLOSE, STATUS_DEPLOY, STATUS_PENDING, STATUS_PROCESSING, STATUS_REFUND } from '../status-constants';
import { ProcessingState } from '../states/ProcessingState';
import { PendingState } from '../states/PendingState';
import { DeployState } from '../states/DeployState';
import { RefundState } from '../states/RefundState';
import { CloseState } from '../states/CloseState';
import { NewState } from '../states/NewState';

export class StateFactory implements IStateFactory {
    public create(status: string, context: IContext): IState {
        switch (status) {
            case STATUS_PROCESSING:
                return new ProcessingState(context);
            case STATUS_PENDING:
                return new PendingState(context);
            case STATUS_DEPLOY:
                return new DeployState(context);
            case STATUS_REFUND:
                return new RefundState(context);
            case STATUS_CLOSE:
                return new CloseState(context);
            case STATUS_NEW:
                return new NewState(context);
            default:
                throw new Error('Undefined status: ' + status);
        }
    }
}

export default new StateFactory();