import fs from 'fs';

const data = fs.readFileSync('day3/input.txt').toString('utf-8').split('\n');

let gamma = '';
let epsilon = '';
const bitMatrix: string[][] = [];

for (let i=0; i < data.length; i++) {
  for (let j=0; j < data[i].length; j++) {
    if (!bitMatrix[j]) {
      bitMatrix[j] = [];
    }
    bitMatrix[j][i] = data[i][j];
  }
}

for (const bits of bitMatrix) {
  const zeroes = bits.filter((entry) => entry === '0');
  const ones = bits.filter((entry) => entry === '1');

  if (ones.length > zeroes.length) {
    gamma = gamma.concat('1');
    epsilon = epsilon.concat('0');
  } else {
    gamma = gamma.concat('0');
    epsilon = epsilon.concat('1');
  }
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
