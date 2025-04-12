import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day3/input.txt').toString('utf-8').split('\n').filter((line) => line)

const sumOfPartNumbers = data.reduce((total, line, i) => {
  const gearMatches = [...line.matchAll(/\*/g)]
  let gearRatio = 0;

  for (const gearMatch of gearMatches) {
    const index = gearMatch.index

    const adjacentSameLineNumbers = [...line.matchAll(/\d+/g)].filter((match) => match.index === index + 1 || match.index === index - match[0].length).map((match) => match[0])
    const adjacentPreviousLineNumbers = [...data[i - 1]?.matchAll(/\d+/g)].filter((match) => match.index >= index - match[0].length && match.index <= index + 1).map((match) => match[0])
    const adjacentNextLineNumbers = [...data[i + 1]?.matchAll(/\d+/g)].filter((match) => match.index >= index - match[0].length && match.index <= index + 1).map((match) => match[0])

    const allAdjacentNumbers = adjacentSameLineNumbers.concat(adjacentPreviousLineNumbers).concat(adjacentNextLineNumbers)

    if (allAdjacentNumbers.length === 2) {
      gearRatio += Number(allAdjacentNumbers[0]) * Number(allAdjacentNumbers[1])
    }
  }

  return total + gearRatio
}, 0);

console.log(sumOfPartNumbers)
