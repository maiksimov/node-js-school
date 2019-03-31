import { IState } from '../states/interfaces/IState';
import { IContext } from '../IContext';
export interface IStateFactory {
    create(status: string, context: IContext): IState;
}