import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n').filter((line) => line)

const sum = data.reduce((total, entry) => {
    const numbers = entry.match(/\d/g)!
    const concatNumberString = numbers[0].concat(numbers[numbers.length - 1])
    return total + Number(concatNumberString);
  }, 0);

console.log(sum)
