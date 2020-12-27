/* eslint-disable require-jsdoc */
export default class Pipe {
    // The height of the number is passed when the object is generated.
    height: number;
    // Randomness will decide whether the pipe will show on top or bottom.
    topOrBottom = Math.random() >= 0.5 ? 'top' : 'bottom'
    // Create a new HTML element for the pipe.
    HTMLElement: HTMLElement = document.createElement('div')

    constructor(width: number, maxHeight: number) {
      this.height = Math.random() * maxHeight;
      this.HTMLElement.style.height = this.height + '%';
      this.HTMLElement.className = 'single-pipe ' + this.topOrBottom;
      this.HTMLElement.style.width = width + '%';
    }
}
