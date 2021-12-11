import fs from 'fs';

const data = fs.readFileSync('day7/input.txt').toString('utf-8').split('\n')[0];
const crabPositions = data.split(',').map((position) => Number(position));

const averageCrabPosition = crabPositions.reduce((total, crabPosition) => {
  return total += crabPosition;
}, 0) / crabPositions.length;

const fuelForDistance = (distance: number) => {
  let fuelNeeded = 0;

  for (let i=1; i <= distance; i++) {
    fuelNeeded += i;
  }

  return fuelNeeded;
};

const fuelNeededForPosition = (finalPosition: number) => {
  return crabPositions.reduce((total, crabPosition) => {
    return total += fuelForDistance(Math.abs(finalPosition - crabPosition));
  }, 0);
};

const upperBound = Math.max(...crabPositions);
let minimumFuelNeeded = fuelNeededForPosition(Math.floor(averageCrabPosition));

for (let i=0; i<upperBound; i++) {
  const fuelNeeded= fuelNeededForPosition(i);
  if (fuelNeeded < minimumFuelNeeded) {
    minimumFuelNeeded = fuelNeeded;
  }
}

console.log(`The minimum fuel needed is ${minimumFuelNeeded}`);
