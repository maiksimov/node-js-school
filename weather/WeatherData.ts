import { Observable } from './Interfaces/Observable';
import { Observer } from './Interfaces/Observer';

export class WeatherData implements Observable {
    private observers: Set<Observer> = new Set();

    public async setMeasurements(temperature: number, humidity: number, pressure: number) {
        await this.notifyObservers({ temperature: temperature, humidity: humidity, pressure: pressure });
        return;
    }

    public addObserver(observer: Observer): void {
        this.observers.add(observer);
    }

    public deleteObserver(observer: Observer): void {
        this.observers.delete(observer);
    }

    public notifyObservers(data): void {
        this.observers.forEach(observer => observer.update(data));
    }
}