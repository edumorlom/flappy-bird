export default class Pipe {

    height = 0
    topOrBottom = Math.random() >= 0.5 ? "top" : "bottom"
    HTMLElement: HTMLElement = document.createElement('div')

    constructor(width: number, maxHeight: number) {
        this.height = Math.random() * maxHeight
        this.HTMLElement.style.height = this.height + "%"
        this.HTMLElement.className = "single-pipe " + this.topOrBottom
        this.HTMLElement.style.width = width + "%"
    }

    /**
     * It returns the real height of the pipe,
     * regardless of whether it is positioned "top" or "bottom".
     */
    getNormalizedHeightCoordinate = () => {
        if (this.topOrBottom === "bottom") {
            return 100 - this.height
        }

        return this.height
    }
}