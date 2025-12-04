import { readFileSync } from "node:fs";

const batteries: string[] = readFileSync('day3/input.txt').toString('utf-8').split('\n').filter((line) => line)

let total = 0;

for (const battery of batteries) {
  const voltages = Array.from(battery).map((volt) => Number(volt))

  const maxFirstDigit = Math.max(...voltages.slice(0, voltages.length - 1)) // the highet digit that isn't last
  const maxFirstDigitIndex = voltages.findIndex((volt) => volt == maxFirstDigit)
  const maxSecondDigit = Math.max(...voltages.slice(maxFirstDigitIndex + 1)) // not including the max first digit

  console.log(maxFirstDigit, maxSecondDigit)
  total += Number(maxFirstDigit.toString() + maxSecondDigit.toString())
}

console.log(total)
