"use strict";
exports.__esModule = true;
exports.Bird = void 0;
var Bird = /** @class */ (function () {
    function Bird(speed) {
        this.speed = 1;
        this.altitude = 0;
        this.direction = "down";
        this.speed = speed || this.speed;
    }
    Bird.prototype.flyUp = function () {
        var _this = this;
        var down = setTimeout(function () {
            _this.altitude -= 1;
        }, 1000);
        while (this.altitude != 0) {
            console.log("Flying up!");
        }
    };
    return Bird;
}());
exports.Bird = Bird;
