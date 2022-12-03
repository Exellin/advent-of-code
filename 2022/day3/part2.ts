import fs from 'fs';

const data = fs.readFileSync('day3/input.txt').toString('utf-8').split('\n');
let sum = 0;
let backpacks: string[] = [];

for (let j=0; j<data.length; j++) {
  const backpack = data[j];
  backpacks.push(backpack);

  if (backpacks.length === 3) {
    for (let i=0; i<backpacks[0].length; i++) {
      const duplicate = Array.from(backpacks[0]).find((item) => backpacks[1].includes(item) && backpacks[2].includes(item));
      if (duplicate) {
        if (duplicate.toLowerCase() !== duplicate) {
          sum += duplicate.toLowerCase().charCodeAt(0) - 96 + 26;
        } else {
          sum += duplicate.toLowerCase().charCodeAt(0) - 96;
        }
        break;
      }
    }

    backpacks = [];
  }
}

console.log(sum);
