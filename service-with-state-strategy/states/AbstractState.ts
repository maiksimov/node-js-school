import { State } from './interfaces/State';
import { ServiceContext } from '../ServiceContext';

export abstract class AbstractState implements State {
    protected _context;

    constructor(context: ServiceContext) {
        this._context = context;
    }

    abstract next(): void;
    abstract refund(): void;
    abstract close(): void;
}