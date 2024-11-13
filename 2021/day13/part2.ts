import { readFileSync, writeFile } from "node:fs";

const data: string[] = readFileSync('day13/input.txt').toString('utf-8').split('\n').filter((line: string) => line.length > 0);
const holes: {[key: string]: number}[] = data.filter((line) => !line.includes('fold')).map((coordinates) => {
  const [x, y] = coordinates.split(',');
  return {x: Number(x), y: Number(y)};
});

const foldInstructions = data.filter((line) => line.includes('fold'));
for (const foldInstruction of foldInstructions) {
  const [axis, value] = foldInstruction.replace('fold along ', '').split('=');

  holes.filter((hole) => hole[axis] > Number(value)).map((hole) => hole[axis] -= 2 * (hole[axis] - Number(value)));
}

const maxX = Math.max(...holes.map((hole) => hole.x));
const maxY = Math.max(...holes.map((hole) => hole.y));
const output = [];

for (let y=0; y<=maxY; y++) {
  const rowToDisplay = [];
  for (let x=0; x<=maxX; x++) {
    if (holes.filter((hole) => hole.x === x && hole.y === y).length > 0) {
      rowToDisplay.push('#');
    } else {
      rowToDisplay.push('.');
    }
  }
  output.push(rowToDisplay);
}

writeFile('day13/output.txt', output.join('\n'), function (err: string) {
  if (err) return console.log(err);
});
