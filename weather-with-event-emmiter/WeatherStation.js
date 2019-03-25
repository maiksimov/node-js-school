"use strict";
exports.__esModule = true;
var events_1 = require("events");
var ConditionsDisplay_1 = require("./ConditionsDisplay");
var ForecastDisplay_1 = require("./ForecastDisplay");
var StatisticsDisplay_1 = require("./StatisticsDisplay");
var WeatherStation = (function () {
    function WeatherStation() {
        this.EVENT_NAME = 'update';
        this.event_emitter = new events_1.EventEmitter();
        this.condition_display = new ConditionsDisplay_1.ConditionsDisplay();
        this.forecast_display = new ForecastDisplay_1.ForecastDisplay();
        this.statistics_display = new StatisticsDisplay_1.StatisticsDisplay();
        this.event_emitter.addListener(this.EVENT_NAME, this.condition_display.update);
        this.event_emitter.addListener(this.EVENT_NAME, this.statistics_display.update);
        this.event_emitter.addListener(this.EVENT_NAME, this.forecast_display.update);
    }
    WeatherStation.prototype.run = function (i) {
        this.event_emitter.emit(this.EVENT_NAME, { temperature: i, humidity: (i - 10), pressure: (i - 40) });
    };
    return WeatherStation;
}());
exports.WeatherStation = WeatherStation;
var station = new WeatherStation();
for (var i = 70; i < 73; i++) {
    station.run(i);
}
