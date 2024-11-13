import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day8/input.txt').toString('utf-8').split('\n');

const neededSegments = {
  1: 2,
  4: 4,
  7: 3,
  8: 7
};

const numbersWithUniqueSegmentsInOutputValues = data.reduce((total, line) => {
  if (!line.includes('|')) {
    return total;
  }
  const outputValues = line.split(' | ')[1].split(' ');
  return total += outputValues.filter((value) => Object.values(neededSegments).includes(value.length)).length;
}, 0);

console.log(`There are ${numbersWithUniqueSegmentsInOutputValues} numbers with unique segments in the output values`);
