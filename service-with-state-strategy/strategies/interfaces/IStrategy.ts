import { IState } from '../../states/interfaces/IState';
export interface IStrategy {
    execute(state: IState): void;
}