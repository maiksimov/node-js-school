import { IContext } from './IContext';
import { IState } from './states/interfaces/IState';
import StateFactory from './factories/StateFactory';
import StrategyFactory from './factories/StrategyFactory';

export class ServiceContext implements IContext {
    private _state;
    private _status;
    private _strategy;

    constructor (status: string, action: string) {
        this._state = StateFactory.create(status, this);
        this._strategy = StrategyFactory.create(action);
    }

    set Status(status: string) {
        this._status = status;
    }

    get Status() {
        return this._status;
    }

    set State(state: IState) {
        this._state = state;
    }

    get State(): IState {
        return this._state;
    }

    run(): string {
        this._strategy.execute(this.State);
        return this.Status;
    }
}