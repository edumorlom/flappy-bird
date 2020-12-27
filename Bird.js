var BIRDIMAGE = "./resources/bird.png";
var Bird = /** @class */ (function () {
    function Bird(xAxisInPct) {
        var _this = this;
        this.altitude = 45;
        this.xAxisInPct = 0;
        this.HTMLElement = document.createElement('img');
        this.rotation = 1;
        this.flyUp = function () {
            if (_this.rotation <= 90) {
                _this.rotation = 0;
            }
            _this.HTMLElement.style.transform = "rotate(" + _this.rotation + "deg)";
            var a = setInterval(function () {
                _this.setAltitude(_this.altitude - 0.5);
            }, 1);
            setTimeout(function () {
                clearTimeout(a);
            }, 150);
        };
        this.setAltitude = function (altitude) {
            _this.altitude = altitude;
            _this.HTMLElement.style.top = altitude + "%";
        };
        // Given a percentage, where 0 is the most left and 100
        // is the most right of a screen, place the bird in the xAxis.
        if (xAxisInPct) {
            this.xAxisInPct = xAxisInPct;
        }
        // Set the attributes of the bird.
        this.HTMLElement.id = "bird";
        this.HTMLElement.style.left = this.xAxisInPct + "%";
        this.HTMLElement.setAttribute("src", BIRDIMAGE);
        // Every 1ms, move down 0.1%.
        setInterval(function () {
            _this.setAltitude(_this.altitude + 0.3);
            if (_this.rotation < 90) {
                _this.rotation += 0.5;
            }
            _this.HTMLElement.style.transform = "rotate(" + _this.rotation + "deg)";
        }, 1);
    }
    return Bird;
}());
export default Bird;
