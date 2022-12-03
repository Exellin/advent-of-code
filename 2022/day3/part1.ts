import fs from 'fs';

const data = fs.readFileSync('day3/input.txt').toString('utf-8').split('\n');
let sum = 0;

for (const backpack of data) {
  for (let i=0; i<backpack.length / 2; i++) {
    const firstCompartment = Array.from(backpack).slice(0, backpack.length / 2);
    const secondCompartment = Array.from(backpack).slice(backpack.length / 2);

    const duplicate = firstCompartment.find((itemComparison) => secondCompartment[i] === itemComparison);
    if (duplicate) {
      i = backpack.length / 2;
      if (duplicate.toLowerCase() !== duplicate) {
        sum += duplicate.toLowerCase().charCodeAt(0) - 96 + 26;
      } else {
        sum += duplicate.toLowerCase().charCodeAt(0) - 96;
      }
    }
  }
}

console.log(sum);
