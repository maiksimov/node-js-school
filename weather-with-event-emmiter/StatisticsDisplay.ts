import { Observer } from './Interfaces/Observer';
import { Display } from './Interfaces/Display';

export class StatisticsDisplay  implements Observer, Display {
    temperature_list: number[] = [];
    max_temperature: number = 0;
    min_temperature: number = Infinity;
    avg_temperature: number = 0;

    constructor() {
        this.update = this.update.bind(this);
    }

    private updateAvgTemperature() {
        const avg = this.temperature_list.reduce(( a, b ) => a += b, 0);
        this.avg_temperature = avg / this.temperature_list.length;
    }

    private updateTemperatureList(temperature: number) {
        this.temperature_list.push(temperature);
        this.updateAvgTemperature();
    }

    public update(data) {
        this.max_temperature = data.temperature >= this.max_temperature ? data.temperature : this.max_temperature;
        this.min_temperature = data.temperature <= this.min_temperature ? data.temperature : this.min_temperature;
        this.updateTemperatureList(data.temperature);
        this.display();
    }

    public display() {
        console.log('Avg/Max/Min temperature = ' + this.avg_temperature + '/' + this.max_temperature + '/' + this.min_temperature);
    }
}