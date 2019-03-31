import { IStrategy } from '../strategies/interfaces/IStrategy';

export interface IStrategyFactory {
    create(action: string): IStrategy;
}