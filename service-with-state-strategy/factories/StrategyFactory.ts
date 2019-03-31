import { IStrategyFactory } from './IStrategyFactory';
import { IStrategy } from '../strategies/interfaces/IStrategy';
import { NextStrategy } from '../strategies/NextStrategy';
import { RefundStrategy } from '../strategies/RefundStrategy';
import { CloseStrategy } from '../strategies/CloseStrategy';
import { ACTION_NEXT, ACTION_REFUND, ACTION_CLOSE } from '../action-constants';

export class StrategyFactory implements IStrategyFactory {
    public create(action: string): IStrategy {
        switch (action) {
            case ACTION_REFUND:
                return new RefundStrategy;
            case ACTION_CLOSE:
                return new CloseStrategy;
            case ACTION_NEXT:
            default:
                return new NextStrategy;
        }
    }
}

export default new StrategyFactory;