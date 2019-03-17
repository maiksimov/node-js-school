import { Observer } from './Interfaces/Observer';
import { Display } from './Interfaces/Display';

export class ForecastDisplay implements Observer, Display {


    public update(data) {
        this.display();
    }

    public display() {
        console.log('Forecast: nothing to display');
    }
}