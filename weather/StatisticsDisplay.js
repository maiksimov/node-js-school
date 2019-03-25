"use strict";
exports.__esModule = true;
var StatisticsDisplay = (function () {
    function StatisticsDisplay() {
        this.temperature_list = [];
        this.max_temperature = 0;
        this.min_temperature = Infinity;
        this.avg_temperature = 0;
    }
    StatisticsDisplay.prototype.updateAvgTemperature = function () {
        var avg = this.temperature_list.reduce(function (a, b) { return a += b; }, 0);
        this.avg_temperature = avg / this.temperature_list.length;
    };
    StatisticsDisplay.prototype.updateTemperatureList = function (temperature) {
        this.temperature_list.push(temperature);
        this.updateAvgTemperature();
    };
    StatisticsDisplay.prototype.update = function (data) {
        this.max_temperature = data.temperature >= this.max_temperature ? data.temperature : this.max_temperature;
        this.min_temperature = data.temperature <= this.min_temperature ? data.temperature : this.min_temperature;
        this.updateTemperatureList(data.temperature);
        this.display();
    };
    StatisticsDisplay.prototype.display = function () {
        console.log('Avg/Max/Min temperature = ' + this.avg_temperature + '/' + this.max_temperature + '/' + this.min_temperature);
    };
    return StatisticsDisplay;
}());
exports.StatisticsDisplay = StatisticsDisplay;
