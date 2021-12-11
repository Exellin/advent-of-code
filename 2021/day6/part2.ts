import fs from 'fs';

const data = fs.readFileSync('day6/input.txt').toString('utf-8').split('\n')[0];
const lanternFish = data.split(',').map((fish) => Number(fish));
const days = 256;
const DEFAULT_REFRESH_FISH_TIMER = 6;
const NEW_FISH_TIMER = 8;

let fish = 1;
const knownFish: number[] = [];

const fishAfterDays = (totalDays:number, fishTimer:number) => {
  if (totalDays === days) {
    fish = 1;
  }

  const daysUntilNextSplit = fishTimer + 1;
  const timesSplit = Math.floor((totalDays - daysUntilNextSplit) / (DEFAULT_REFRESH_FISH_TIMER + 1) + 1);
  fish += timesSplit;

  for (let i = 0; i < timesSplit; i++) {
    const daysRemainigForNewFish = totalDays - i * (DEFAULT_REFRESH_FISH_TIMER + 1) - fishTimer - 1;

    if (daysRemainigForNewFish > NEW_FISH_TIMER) {
      fishAfterDays(daysRemainigForNewFish, 8);
    }
  }

  return fish;
};

const totalFish = lanternFish.reduce((total, fishNumber) => {
  if (!knownFish[fishNumber]) {
    knownFish[fishNumber] = fishAfterDays(days, fishNumber);
  }
  return total += knownFish[fishNumber];
}, 0);

console.log(`There are ${totalFish} lanternfish after ${days} days`);
