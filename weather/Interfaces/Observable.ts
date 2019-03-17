import { Observer } from './Observer';

export interface Observable {
    addObserver(observer: Observer): void;
    deleteObserver(observer: Observer): void;
    notifyObservers(eventName: String): void;
}