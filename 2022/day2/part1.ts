import { readFileSync } from "node:fs";

const SHAPE_SCORES = {
  "rock": 1,
  "paper": 2,
  "scissors": 3
};

const WIN_POINTS = 6;
const LOSS_POINTS = 0;
const DRAW_POINTS = 3;
const GUIDE_MAP = {
  "A": 'rock',
  "B": "paper",
  "C": "scissors",
  "X": "rock",
  "Y": "paper",
  "Z": "scissors"
};

type Play = keyof typeof GUIDE_MAP
type Shape = keyof typeof SHAPE_SCORES;

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n');

const findMatchResult = ((opponentPlay: Shape, myPlay: Shape) => {
  if (opponentPlay === myPlay) { return DRAW_POINTS; }
  if ((opponentPlay === 'scissors' && myPlay === 'rock') || (opponentPlay === 'rock' && myPlay === 'paper') || (opponentPlay === 'paper' && myPlay === 'scissors')) {
    return WIN_POINTS;
  }
  return LOSS_POINTS;
});

const calculateScore = (total: number, match: string) => {
  if (match.length === 0) { return total; }
  const [opponentPlay, myPlay] = match.split(' ')
    .map((play) => GUIDE_MAP[play as Play]);
  const shapeScore = SHAPE_SCORES[myPlay as Shape];
  const matchScore = findMatchResult(opponentPlay as Shape, myPlay as Shape);

  return total + shapeScore + matchScore;
};

const output = data.reduce(calculateScore, 0);

console.log(output);
