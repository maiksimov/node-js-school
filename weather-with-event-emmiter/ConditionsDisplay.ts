import { Observer } from './Interfaces/Observer';
import { Display } from './Interfaces/Display';

export class ConditionsDisplay implements Observer, Display {
    temperature: number;
    humidity: number;

    constructor() {
        this.update = this.update.bind(this);
    }

    public update(data) {
        this.temperature = data.temperature;
        this.humidity = data.humidity;
        this.display();
    }

    public display() {
        console.log('Current conditions: ' + this.temperature + 'F degrees and ' + this.humidity + '% humidity');
    }
}