var Pipe = /** @class */ (function () {
    function Pipe(width, maxHeight) {
        var _this = this;
        this.height = 0;
        this.topOrBottom = Math.random() >= 0.5 ? "top" : "bottom";
        this.HTMLElement = document.createElement('div');
        /**
         * It returns the real height of the pipe,
         * regardless of whether it is positioned "top" or "bottom".
         */
        this.getNormalizedHeightCoordinate = function () {
            if (_this.topOrBottom === "bottom") {
                return 100 - _this.height;
            }
            return _this.height;
        };
        this.height = Math.random() * maxHeight;
        this.HTMLElement.style.height = this.height + "%";
        this.HTMLElement.className = "single-pipe " + this.topOrBottom;
        this.HTMLElement.style.width = width + "%";
    }
    return Pipe;
}());
export default Pipe;
