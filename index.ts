// USE `tsc --module esnext  --watch *.ts`

import Bird from './Bird.js';
import Pipe from './Pipe.js';
import Config from './Config.js';

type positionType = Pipe | null;

let score = 0;
const scoreHTMLElement = document.getElementById('score');

const birdXAxisInPct = (Config.birdPositionOnGrid / Config.totalPlaces) * 100;
const bird = new Bird(birdXAxisInPct);

// The map of the game contains n places.
// Each place starts off empty spaces, but is then filled as the game goes on.
const map: positionType[] = new Array(Config.totalPlaces);

// The sky element in the dom.
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

  if (position.topOrBottom === 'top') {
    birdCollision = bird.altitude < position.height;
  } else {
    birdCollision = bird.altitude > (100 - pipeWidthInPct) - position.height;
  }

  return !birdCollision;
};

setInterval(() => {
  skyHTMLElement.innerHTML = '';
  map.forEach((position, index) => {
    if (position !== null) {
      const pipeHTMLElement = position.HTMLElement;
      const xAxisInPct = (index / Config.totalPlaces) * 100;
      pipeHTMLElement.style.left = xAxisInPct + '%';
      pipeHTMLElement.setAttribute('key', String(index));
      skyHTMLElement.appendChild(pipeHTMLElement);
    }
  });
  skyHTMLElement.appendChild(bird.HTMLElement);
}, 1);

setInterval(() => {
  // Decides whether to insert a pipe or an empty space.
  const emptyOrPipe = Math.random() >= (Config.pipeProbabilityInPct / 100);

  let space = null;

  // If emptyOrPipe, create a new Pipe, otherwise it's an empty space.
  if (emptyOrPipe) {
    space = new Pipe(pipeWidthInPct, Config.maxPipeHeightInPct)
  }

  // Place the new space to the map and get rid of index 0.
  // This will create an effect of moving forward.
  map.push(space);
  map.shift();

  // Every iteration, add 1 to the score.
  score += 1;

  // Update the score on the DOM.
  if (scoreHTMLElement) {
    scoreHTMLElement.innerHTML = String(score);
  }

  // If bird has died, display message.
  const gameOver = !isGameOn();
  if (gameOver) {
    alert(`You have died! Your score is ${score}`);
    location.reload();
  }
}, Config.startSpeed);

// Every time the user presses a key, the bird flies up.
document.addEventListener('keypress', () => {
  bird.flyUp();
});
