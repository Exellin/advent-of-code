import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day3/input.txt').toString('utf-8').split('\n').filter((line) => line)

const sumOfPartNumbers = data.reduce((total, line, i) => {
  const engineNumberMatches = [...line.matchAll(/\d+/g)]
  let lineTotal = 0;

  for (const engineNumberMatch of engineNumberMatches) {
    const index = engineNumberMatch.index
    const engineNumber = engineNumberMatch[0]

    const adjacentHorizonalSymbol = line.substring(index -1, index + engineNumber.length + 1).match(/[^0-9.]/g)
    const adjacentPreviousLineSymbol = data[i - 1]?.substring(index -1, index + engineNumber.length + 1).match(/[^0-9.]/g)
    const adjacentNextLineSymbol = data[i + 1]?.substring(index -1, index + engineNumber.length + 1).match(/[^0-9.]/g)

    if (adjacentHorizonalSymbol || adjacentPreviousLineSymbol || adjacentNextLineSymbol) {
      lineTotal += Number(engineNumber)
    }
  }

  return total + lineTotal
}, 0);

console.log(sumOfPartNumbers)
