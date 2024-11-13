import { readFileSync } from "node:fs";

type Octopus = {
  energy: number,
  flashed?: boolean,
  x: number,
  y: number
}

const data = readFileSync('day11/input.txt').toString('utf-8').split('\n').filter((line: string) => line.length > 0);
const octopi: Octopus[] = [];
const STEPS = 100;
const MAX_ENERGY = 9;
let flashes = 0;

for (let i=0; i<data.length; i++) {
  const row = Array.from(data[i]).map((value) => Number(value));

  for (let j=0; j<data[i].length; j++) {
    octopi.push({
      energy: row[j],
      y: i,
      x: j,
      flashed: false
    });
  }
}

for (let i=1; i<=STEPS; i++) {
  octopi.forEach((octopus) => octopus.energy++);

  while (octopi.filter((octopus) => octopus.energy > MAX_ENERGY && octopus.flashed === false).length > 0) {
    octopi.filter((octopus) => octopus.energy > MAX_ENERGY && octopus.flashed === false).forEach((flashingOctopus) => {
      const surroundingOctopi = octopi.filter((octopus) => {
        return (Math.abs(flashingOctopus.x - octopus.x) <=1) && (Math.abs(flashingOctopus.y - octopus.y) <=1);
      });

      surroundingOctopi.forEach((octopus) => octopus.energy++);
      flashingOctopus.flashed = true;
      flashes++;
    });
  }

  octopi.filter((octopus) => octopus.flashed).forEach((flashedOctopus) => {
    flashedOctopus.energy = 0;
    flashedOctopus.flashed = false;
  });
}

console.log(`There were a total of ${flashes} flashes across ${STEPS} steps`);
