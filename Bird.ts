import Config from './Config.js';

/* eslint-disable require-jsdoc */
export default class Bird {
    altitude = 45
    xAxisInPct = 0
    HTMLElement: HTMLElement = document.createElement('img')
    flyingUp: boolean
    rotation = 1

    constructor(xAxisInPct?: number) {
       // Given a percentage, where 0 is the most left and 100
       // is the most right of a screen, place the bird in the xAxis.
       if (xAxisInPct) {
          this.xAxisInPct = xAxisInPct;
       }

       this.flyingUp = false;

       // Set the attributes of the bird.
       this.HTMLElement.id = 'bird';
       this.HTMLElement.style.left = this.xAxisInPct + '%';
       this.HTMLElement.setAttribute('src', Config.birdImage);

       setInterval(() => {
          // Every 1ms, move down in altitude.
          // 0% is the top of the screen, so down up is adding.
          this.setAltitude(this.altitude + 0.25);

          // While the bird is falling, rotate it.
          // Bird will completely look down, aka 90 degrees.
          if (this.rotation < 90) {
             this.rotation += 0.5;
          }

          this.HTMLElement.style.transform = `rotate(${this.rotation}deg)`;
       }, 1);
    }

    flyUp() {
       // If it is already flying up, don't fly up again.
       if (this.flyingUp) return;
       // Otherwise, fly up.
       this.flyingUp = true;

       // When the bird if flying upwards, reposition the rotation to 0.
       // The bird must be looking forward.
       if (this.rotation <= 90) {
          this.rotation = 0;
       }

       this.HTMLElement.style.transform = `rotate(${this.rotation}deg)`;

       // Every 1ms, move up in altitude.
       // 0% is the top of the screen, so moving up is subtracting.
       const a = setInterval(() => {
          this.setAltitude(this.altitude - 0.6);
       }, 1);

       // Only fly upwards for Config.flyUpMs ms.
       setTimeout(() => {
          this.flyingUp = false;
          clearTimeout(a);
       }, Config.flyUpMs);
    }

    setAltitude(altitude: number) {
       this.altitude = altitude;
       this.HTMLElement.style.top = altitude + '%';
    }
}
