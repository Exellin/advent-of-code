import fs from 'fs';

const data = fs.readFileSync('day6/input.txt').toString('utf-8').split('\n')[0];
const lanternFish = data.split(',').map((fish) => Number(fish));
const days = 80;

const simulateDay = () => {
  for (let i = lanternFish.length - 1; i >= 0; i--) {
    if (lanternFish[i] === 0) {
      lanternFish[i] = 6;
      lanternFish.push(8);
    } else {
      lanternFish[i]--;
    }
  }
};

for (let i = 0; i < days; i++) {
  simulateDay();
}

console.log(`There are ${lanternFish.length} lanternfish after ${days} days`);
