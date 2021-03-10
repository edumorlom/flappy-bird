import Bird from './Bird.js';
import Pipe from './Pipe.js';
import Config from './Config.js';

type positionType = Pipe | null;

// The total score the of the player.
// The score is incremented every movement the bird makes forward.
let score = 0;
const scoreHTMLElement = document.getElementById('score');

// The position of the bird in the X axis, in percent.
// 50% would signify the middle of the screen.
const birdXAxisInPct = (Config.birdPositionOnGrid / Config.totalPlaces) * 100;
const bird = new Bird(birdXAxisInPct);

// The map of the game contains n places.
// Each place starts off empty spaces, but is then filled as the game goes on.
const map: positionType[] = new Array(Config.totalPlaces);

// The sky element in the DOM.
const skyHTMLElement = document.getElementsByClassName('sky')[0];

// The width of the pipe in percent. 100% is the entire screen.
const pipeWidthInPct = (1 / Config.totalPlaces) * 100;

const isGameOn = (): boolean => {
   // Is the bird out of bounds? Bounds are 0% to 100% in height.
   const birdOutOfBounds = bird.altitude <= 0 || bird.altitude >= 100;

   if (birdOutOfBounds) {
      return false;
   }

   // Grab the bird's position in the map, is there a pipe?
   const position: positionType = map[Config.birdPositionOnGrid];

   // If the position the bird on doesn't contain a pipe, game hasn't ended.
   if (position == null) {
      return true;
   }

   // Has the bird collided? Is the pipe on top or bottom of screen?
   let birdCollision = false;

   // The bird has collided if when the bird and the pipe
   // are in the same xAxis position, the bird is not within the
   // pipe boundaries in the yAxis.
   // yAxis = altitude
   if (position.topOrBottom === 'top') {
      birdCollision = bird.altitude < position.height;
   } else {
      birdCollision = bird.altitude > (100 - pipeWidthInPct) - position.height;
   }

   return !birdCollision;
};

setInterval(() => {
   // Reset everything inside the sky DOM element.
   // This includes getting rid of the bird.
   // It will be re-added later on.
   skyHTMLElement.innerHTML = '';

   // For every position in the map
   // if there is a pipe, draw the pipe.
   map.forEach((position, index) => {
      // Only draw the pipe if the position != null,
      // null === empty space
      // otherwise, it means pipe
      if (position !== null) {
         const pipeHTMLElement = position.HTMLElement;
         const xAxisInPct = (index / Config.totalPlaces) * 100;
         pipeHTMLElement.style.left = xAxisInPct + '%';
         pipeHTMLElement.setAttribute('key', String(index));
         skyHTMLElement.appendChild(pipeHTMLElement);
      }
   });
   // Re-draw the bird.
   skyHTMLElement.appendChild(bird.HTMLElement);
}, 1);

setInterval(() => {
   // Decides whether to insert a pipe or an empty space.
   // insertPipe === true, this position will contain a pipe.
   const insertPipe = Math.random() >= (Config.pipeProbabilityInPct / 100);

   // There can either be an empty space of a pipe.
   let position = null;

   // If insertPipe, create a new Pipe, otherwise it's an empty space.
   if (insertPipe) {
      position = new Pipe(pipeWidthInPct, Config.maxPipeHeightInPct);
   }

   // Place the new space to the map and get rid of index 0.
   // This will create an effect of moving forward.
   map.push(position);
   map.shift();

   // Every iteration, add 1 to the score.
   score += 1;

   // Update the score on the DOM.
   if (scoreHTMLElement) {
      scoreHTMLElement.innerHTML = String(score);
   }

   // If bird has died, display message.
   if (!isGameOn()) {
      alert(`You have died! Your score is ${score}`);
      location.reload();
   }
}, Config.startSpeed);

// Every time the user presses a key, the bird flies up.
document.addEventListener('keypress', () => {
   bird.flyUp();
});
