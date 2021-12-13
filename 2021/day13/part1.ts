import fs from 'fs';

const data = fs.readFileSync('day13/input.txt').toString('utf-8').split('\n').filter((line) => line.length > 0);
const holes: {[key: string]: number}[] = data.filter((line) => !line.includes('fold')).map((coordinates) => {
  const [x, y] = coordinates.split(',');
  return {x: Number(x), y: Number(y)};
});

const foldInstruction = data.filter((line) => line.includes('fold'))[0];
const [axis, value] = foldInstruction.replace('fold along ', '').split('=');
holes.filter((hole) => hole[axis] > Number(value)).map((hole) => hole[axis] -= 2 * (hole[axis] - Number(value)));

const maxX = Math.max(...holes.map((hole) => hole.x));
const maxY = Math.max(...holes.map((hole) => hole.y));
let visibleHoles = 0;

for (let y=0; y<=maxY; y++) {
  const rowToDisplay = [];
  for (let x=0; x<=maxX; x++) {
    if (holes.filter((hole) => hole.x === x && hole.y === y).length > 0) {
      visibleHoles++;
      rowToDisplay.push('#');
    } else {
      rowToDisplay.push('.');
    }
  }
  console.log(rowToDisplay);
}

console.log(`There are ${visibleHoles} holes visible after folding the paper once`);
