import fs from 'fs';

const data = fs.readFileSync('day2/input.txt').toString('utf-8').split('\n');

let x = 0;
let y = 0;

for (const dataPoint of data) {
  const [direction, magnitude] = dataPoint.split(' ');
  switch (direction) {
    case 'forward':
      x = x + Number(magnitude);
      break;
    case 'up':
      y = y - Number(magnitude);
      break;
    case 'down':
      y = y + Number(magnitude);
      break;
    default:
      console.log(`Invalid direction ${direction}`);
  }
}

console.log(x * y);
