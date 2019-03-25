"use strict";
exports.__esModule = true;
var ForecastDisplay = (function () {
    function ForecastDisplay() {
        this.update = this.update.bind(this);
    }
    ForecastDisplay.prototype.update = function (data) {
        this.display();
    };
    ForecastDisplay.prototype.display = function () {
        console.log('Forecast: nothing to display');
    };
    return ForecastDisplay;
}());
exports.ForecastDisplay = ForecastDisplay;
