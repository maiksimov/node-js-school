import { IState } from './interfaces/IState';
import { IContext } from '../IContext';

export abstract class AbstractState implements IState {
    protected _context;

    constructor(context: IContext) {
        this._context = context;
    }

    next() {
        throw new Error('Step Next not allow for this state');
    }

    refund() {
        throw new Error('Step Refund not allow for this state');
    }

    close() {
        throw new Error('Step Close not allow for this state');
    }
}