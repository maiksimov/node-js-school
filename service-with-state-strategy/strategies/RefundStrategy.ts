import { Strategy } from './interfaces/Strategy';
import { State } from '../states/interfaces/State';

export class RefundStrategy implements Strategy {
    execute(state: State) {
        state.refund();
    }
}