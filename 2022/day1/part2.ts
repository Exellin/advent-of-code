import fs from 'fs';

const data = fs.readFileSync('day1/input.txt').toString('utf-8').split('\n');
const elves: number[] = [0];
const MAX_NUMBER = 3;
let totalCalories = 0;

for (const calorieCount of data) {
  if (calorieCount !== '') {
    elves[elves.length - 1] += Number(calorieCount);
  } else {
    elves.push(0);
  }
}

for (let i = 0; i<MAX_NUMBER; i++) {
  const maxCalories = Math.max(...elves);
  const maxIndex = elves.findIndex((elf) => elf === maxCalories);
  elves.splice(maxIndex, 1);
  totalCalories += maxCalories;
}

console.log(totalCalories);
