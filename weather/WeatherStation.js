"use strict";
exports.__esModule = true;
var WeatherData_1 = require("./WeatherData");
var ConditionsDisplay_1 = require("./ConditionsDisplay");
var ForecastDisplay_1 = require("./ForecastDisplay");
var StatisticsDisplay_1 = require("./StatisticsDisplay");
var WeatherStation = (function () {
    function WeatherStation() {
        this.weather_data = new WeatherData_1.WeatherData();
        var condition_display = new ConditionsDisplay_1.ConditionsDisplay();
        var forecast_display = new ForecastDisplay_1.ForecastDisplay();
        var statistics_display = new StatisticsDisplay_1.StatisticsDisplay();
        this.weather_data.addObserver(condition_display);
        this.weather_data.addObserver(forecast_display);
        this.weather_data.addObserver(statistics_display);
    }
    WeatherStation.prototype.run = function () {
        this.weather_data.setMeasurements(80, 65, 30.4);
        this.weather_data.setMeasurements(82, 70, 29.2);
        this.weather_data.setMeasurements(78, 90, 29.2);
    };
    return WeatherStation;
}());
exports.WeatherStation = WeatherStation;
var station = new WeatherStation();
for (var i = 0; i < 10000000; i++) {
    station.run();
}
