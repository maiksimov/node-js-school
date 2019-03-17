import { EventEmitter } from 'events';
import { ConditionsDisplay } from './ConditionsDisplay';
import { ForecastDisplay } from './ForecastDisplay';
import { StatisticsDisplay } from './StatisticsDisplay';

export class WeatherStation {
    private event_emitter: EventEmitter;
    private condition_display: ConditionsDisplay;
    private forecast_display: ForecastDisplay;
    private statistics_display: StatisticsDisplay;
    private EVENT_NAME = 'update';

    constructor() {
        this.event_emitter = new EventEmitter();
        this.condition_display = new ConditionsDisplay();
        this.forecast_display = new ForecastDisplay();
        this.statistics_display = new StatisticsDisplay();

        this.event_emitter.addListener(this.EVENT_NAME, this.condition_display.update);
        this.event_emitter.addListener(this.EVENT_NAME, this.statistics_display.update);
        this.event_emitter.addListener(this.EVENT_NAME, this.forecast_display.update);
    }

    public run(i) {
         this.event_emitter.emit(this.EVENT_NAME, { temperature: i, humidity: 80, pressure: 80 });
    }
}

const station = new WeatherStation();

for ( let i = 70; i < 73; i++ ) {
    station.run(i);
}
