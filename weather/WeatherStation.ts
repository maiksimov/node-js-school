import { WeatherData } from './WeatherData';
import { ConditionsDisplay } from './ConditionsDisplay';
import { ForecastDisplay } from './ForecastDisplay';
import { StatisticsDisplay } from './StatisticsDisplay';

export class WeatherStation {
    private weather_data: WeatherData = new WeatherData();

    constructor() {
        const condition_display = new ConditionsDisplay();
        const forecast_display = new ForecastDisplay();
        const statistics_display = new StatisticsDisplay();

        this.weather_data.addObserver(condition_display);
        this.weather_data.addObserver(forecast_display);
        this.weather_data.addObserver(statistics_display);
    }

    public run() {
        this.weather_data.setMeasurements(80, 65, 30.4);
        this.weather_data.setMeasurements(82, 70, 29.2);
        this.weather_data.setMeasurements(78, 90, 29.2);
    }
}

const station = new WeatherStation();

for ( let i = 0; i < 10000000; i++ ) {
    station.run();
}
