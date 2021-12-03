import fs from 'fs';

const data = fs.readFileSync('day3/input.txt').toString('utf-8').split('\n');

let oxygenRating = 0;
let C02Rating = 0;
let oxygenArray = data;
let C02Array = data;
const binaryLength = data[0].length;

for (let i=0; i < binaryLength; i++) {
  const oxygenZeroes = oxygenArray.filter((entry) => entry[i] === '0');
  const oxygenOnes = oxygenArray.filter((entry) => entry[i] === '1');

  const C02Zeroes = C02Array.filter((entry) => entry[i] === '0');
  const C02Ones = C02Array.filter((entry) => entry[i] === '1');

  if (oxygenZeroes.length > oxygenOnes.length) {
    oxygenArray = oxygenArray.filter((entry) => entry[i] === '0');
  } else {
    oxygenArray = oxygenArray.filter((entry) => entry[i] === '1');
  }

  if (C02Zeroes.length > C02Ones.length) {
    C02Array = C02Array.filter((entry) => entry[i] === '1');
  } else {
    C02Array = C02Array.filter((entry) => entry[i] === '0');
  }

  if (oxygenArray.length === 1) {
    oxygenRating = parseInt(oxygenArray[0], 2);
  }

  if (C02Array.length === 1) {
    C02Rating = parseInt(C02Array[0], 2);
  }
}

console.log(C02Rating * oxygenRating);
