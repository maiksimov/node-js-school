import { IStrategy } from './interfaces/IStrategy';
import { IState } from '../states/interfaces/IState';

export class NextStrategy implements IStrategy {
    execute(state: IState) {
        state.next();
    }
}