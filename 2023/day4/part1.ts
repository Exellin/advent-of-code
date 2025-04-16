import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n').filter((line) => line)

const pointsOfAllCards = data.reduce((total, card) => {
  let lineTotal = 0;

  const numbers = card.split(': ')[1]
  const [winningNumberMatches, myNumberMatches] = numbers.split(' | ').map((line) => [...line.matchAll(/\d+/g)])

  const winningNumbers = winningNumberMatches.map((match) => match[0])
  const myNumbers = myNumberMatches.map((match) => match[0])

  for (const winningNumber of winningNumbers) {
    if (myNumbers.indexOf(winningNumber) > -1) {
      if (lineTotal === 0) {
        lineTotal = 1
      } else {
        lineTotal *= 2
      }
    }
  }

  return total + lineTotal
}, 0);

console.log(pointsOfAllCards)
