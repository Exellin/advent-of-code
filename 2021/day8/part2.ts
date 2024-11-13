import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day8/input.txt').toString('utf-8').split('\n').filter((line: string) => line.length > 0);

const neededSegments = {
  1: 2,
  4: 4,
  7: 3,
  8: 7
};

let totalDecodedOutput = 0;
const containsNumCharacters = (string1: string, string2: string, numCharacters: number) => {
  return Array.from(string2).filter((character) => string1.includes(character)).length === numCharacters;
};

for (const line of data) {
  const [input, output] = line.split(" | ").map((text) => text.split(' '));
  const uniqueSignalPatterns: any = {};
  Object.entries(neededSegments).forEach((segment) => {
    const foundInput = input.find((value) => value.length === segment[1]);
    if (foundInput) {
      uniqueSignalPatterns[foundInput] = Number(segment[0]);
      uniqueSignalPatterns[segment[0]] = foundInput;
    }
  });

  // 0 has two in common with 1, three in common with 4, and three in common with 7, has a length of 6
  const zeroKey = input.find((value) => value.length === 6 && containsNumCharacters(value, uniqueSignalPatterns[4], 3) && containsNumCharacters(value, uniqueSignalPatterns[7], 3));
  if (zeroKey) {
    uniqueSignalPatterns[zeroKey] = 0;
  }

  // 2 has one in common with 1, two in common with 4, and two in common with 7, has a length of 5
  const twoKey  = input.find((value) => value.length === 5 && containsNumCharacters(value, uniqueSignalPatterns[4], 2));
  if (twoKey) {
    uniqueSignalPatterns[twoKey] = 2;
  }

  // 3 has two in common with 1, three in common with 4, and three in common with 7, has a length of 5
  const threeKey  = input.find((value) => value.length === 5 && containsNumCharacters(value, uniqueSignalPatterns[7], 3));
  if (threeKey) {
    uniqueSignalPatterns[threeKey] = 3;
  }

  // 5 has one in common with 1, three in common with 4, and two in common with 7, has a length of 5
  const fiveKey = input.find((value) => value.length === 5 && containsNumCharacters(value, uniqueSignalPatterns[4], 3) && containsNumCharacters(value, uniqueSignalPatterns[7], 2));
  if (fiveKey) {
    uniqueSignalPatterns[fiveKey] = 5;
  }

  // 6 has one in common with 1, three in common with 4, and two in common with 7, has a length of 6
  const sixKey = input.find((value) => value.length === 6 && containsNumCharacters(value, uniqueSignalPatterns[1], 1));
  if (sixKey) {
    uniqueSignalPatterns[sixKey] = 6;
  }

  // 9 has two in common with 1, four in common with 4, and three in common with 7, has a length of 6
  const nineKey = input.find((value) => value.length === 6 && containsNumCharacters(value, uniqueSignalPatterns[4], 4));
  if (nineKey) {
    uniqueSignalPatterns[nineKey] = 9;
  }

  const decodedOutput = output.reduce((total, key) => {
    const matchingKey = input.find((value) => containsNumCharacters(value, key, key.length) && value.length === key.length);
    if (matchingKey) {
      return total += String(uniqueSignalPatterns[matchingKey]);
    } else {
      return total;
    }
  }, '');

  totalDecodedOutput += Number(decodedOutput);
}

console.log(`the total decoded output is ${totalDecodedOutput}`);
