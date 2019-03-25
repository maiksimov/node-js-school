import { State } from '../../states/interfaces/State';
export interface Strategy {
    execute(state: State): void;
}