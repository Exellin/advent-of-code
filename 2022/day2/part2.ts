import fs from 'fs';

const SHAPE_SCORES = {
  "rock": 1,
  "paper": 2,
  "scissors": 3
};

const WIN_POINTS = 6;
const LOSS_POINTS = 0;
const DRAW_POINTS = 3;
const OPPONENT_GUIDE_MAP = {
  "A": 'rock',
  "B": "paper",
  "C": "scissors",
};

const MY_GUIDE_MAP = {
  "X": LOSS_POINTS,
  "Y": DRAW_POINTS,
  "Z": WIN_POINTS
};

type OpponentPlay = keyof typeof OPPONENT_GUIDE_MAP
type MyPlay = keyof typeof MY_GUIDE_MAP;
type Shape = keyof typeof SHAPE_SCORES;

const data = fs.readFileSync('day2/input.txt').toString('utf-8').split('\n');

const getShapeScore = (matchScore: number, opponentShape: Shape) => {
  let myShape = '';

  if (matchScore === DRAW_POINTS) {
    myShape = opponentShape;
  }

  if (matchScore === WIN_POINTS) {
    switch (opponentShape) {
      case "scissors":
        myShape = 'rock';
        break;
      case "paper":
        myShape = 'scissors';
        break;
      case "rock":
        myShape = 'paper';
        break;
      default:
        throw new Error('unknown shape');
    }
  }

  if (matchScore === LOSS_POINTS) {
    switch (opponentShape) {
      case "scissors":
        myShape = 'paper';
        break;
      case "paper":
        myShape = 'rock';
        break;
      case "rock":
        myShape = 'scissors';
        break;
      default:
        throw new Error('unknown shape');
    }
  }

  return SHAPE_SCORES[myShape as Shape];
};

const findMatchScore = ((opponentPlay: OpponentPlay, myPlay: MyPlay) => {
  const matchScore = MY_GUIDE_MAP[myPlay];
  const opponentShape = OPPONENT_GUIDE_MAP[opponentPlay];
  const shapeScore = getShapeScore(matchScore, opponentShape as Shape);

  return matchScore + shapeScore;
});

const calculateScore = (total: number, match: string) => {
  if (match.length === 0) { return total; }

  const [opponentPlay, myPlay] = match.split(' ');

  return total + findMatchScore(opponentPlay as OpponentPlay, myPlay as MyPlay);
};

const output = data.reduce(calculateScore, 0);

console.log(output);
