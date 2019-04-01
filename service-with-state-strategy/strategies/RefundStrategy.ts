import { IStrategy } from './interfaces/IStrategy';
import { IState } from '../states/interfaces/IState';

export class RefundStrategy implements IStrategy {
    execute(state: IState) {
        state.refund();
    }
}