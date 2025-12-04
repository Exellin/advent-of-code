import { readFileSync } from "node:fs";

const batteries: string[] = readFileSync('day3/input.txt').toString('utf-8').split('\n').filter((line) => line)

let total = 0;


const findNextLargest = ((voltages, remainingDigits) => {
  // console.log(`${remainingDigits} remaining digits need to be found in ${voltages}`)
  // console.log(voltages.slice(0, voltages.length - remainingDigits + 1))
  const maxFirstDigit = Math.max(...voltages.slice(0, voltages.length - remainingDigits + 1)) // the highest digit that isn't in the last i

  return maxFirstDigit
});

for (const battery of batteries) {
  const voltages = Array.from(battery).map((volt) => Number(volt))

  let sliceIndex = 0;

  let digits: number[] = [];

  for (let i=12; i>0; i--) {
    const maxFirstDigit = findNextLargest(voltages.slice(sliceIndex), i)
    const maxFirstDigitIndex = voltages.slice(sliceIndex).findIndex((volt) => volt == maxFirstDigit)
    sliceIndex = sliceIndex + maxFirstDigitIndex + 1;
    digits.push(maxFirstDigit)
  }

  total += Number(digits.join(''))
}

console.log(total)

