"use strict";
exports.__esModule = true;
var ConditionsDisplay = (function () {
    function ConditionsDisplay() {
    }
    ConditionsDisplay.prototype.update = function (data) {
        this.temperature = data.temperature;
        this.humidity = data.humidity;
        this.display();
    };
    ConditionsDisplay.prototype.display = function () {
        console.log('Current conditions: ' + this.temperature + 'F degrees and ' + this.humidity + '% humidity');
    };
    return ConditionsDisplay;
}());
exports.ConditionsDisplay = ConditionsDisplay;
