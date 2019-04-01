import { IStrategy } from './interfaces/IStrategy';
import { IState } from '../states/interfaces/IState';

export class CloseStrategy implements IStrategy {
    execute(state: IState) {
        state.close();
    }
}