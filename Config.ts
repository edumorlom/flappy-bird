type ConfigType = {
   'totalPlaces': number,
   'birdPositionOnGrid': number,
   'startSpeed': number,
   'pipeProbabilityInPct': number,
   'maxPipeHeightInPct': number
   'speedUpEveryXms': number,
   'flyUpMs': number,
   'birdImage': string
}

const Config: ConfigType = {
  // Maximum number of places, or pipes, on the X axis.
  'totalPlaces': 30,
  // Bird is positioned on this spot.
  // Cannot exceeed totalPlaces.
  'birdPositionOnGrid': 4,
  // How often the position is updated, in ms.
  // The smaller the number, the faster it the bird flies.
  // The larger the number, the slower it will fly.
  // Cannot be less than or equal to 0.
  'startSpeed': 100,
  // Probability of a pipe being generated for a given place in the grid.
  'pipeProbabilityInPct': 60,
  // The maximum height a pipe can be.
  'maxPipeHeightInPct': 49,
  // Every X ms, the speed decreases by 1, making it faster.
  'speedUpEveryXms': 500,
  // The amount of time the bird will fly up, in ms.
  'flyUpMs': 250,
  // The path of the bird's image.
  'birdImage': './resources/bird.png'
};

export default Config;
