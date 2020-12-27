/* eslint-disable require-jsdoc */
const BIRDIMAGE = './resources/bird.png';

export default class Bird {
    altitude = 45
    xAxisInPct = 0
    HTMLElement: HTMLElement = document.createElement('img')
    rotation = 1

    constructor(xAxisInPct?: number) {
      // Given a percentage, where 0 is the most left and 100
      // is the most right of a screen, place the bird in the xAxis.
      if (xAxisInPct) {
        this.xAxisInPct = xAxisInPct;
      }

      // Set the attributes of the bird.
      this.HTMLElement.id = 'bird';
      this.HTMLElement.style.left = this.xAxisInPct + '%';
      this.HTMLElement.setAttribute('src', BIRDIMAGE);

      // Every 1ms, move down 0.1%.
      setInterval(() => {
        this.setAltitude(this.altitude + 0.3);
        if (this.rotation < 90) {
          this.rotation += 0.5;
        }
        this.HTMLElement.style.transform = `rotate(${this.rotation}deg)`;
      }, 1);
    }

    flyUp() {
      if (this.rotation <= 90) {
        this.rotation = 0;
      }
      this.HTMLElement.style.transform = `rotate(${this.rotation}deg)`;

      const a = setInterval(() => {
        this.setAltitude(this.altitude - 0.5);
      }, 1);

      setTimeout(() => {
        clearTimeout(a);
      }, 150);
    }

    setAltitude(altitude: number) {
      this.altitude = altitude;
      this.HTMLElement.style.top = altitude + '%';
    }
}
