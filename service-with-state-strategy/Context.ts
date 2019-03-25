import { State } from './states/interfaces/State';
export interface Context {
    setState(state: State): void;
    setStatus(status: string): void;
}