import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n').filter((line) => line)

const extraScratchCardCounts = {

}

const totalScratchCards = data.reduce((total, card, i) => {
  if (!extraScratchCardCounts[i + 1]) {
    extraScratchCardCounts[i + 1] = 1
  }

  let matchingNumbers = 0;

  const numbers = card.split(': ')[1]
  const [winningNumberMatches, myNumberMatches] = numbers.split(' | ').map((line) => [...line.matchAll(/\d+/g)])

  const winningNumbers = winningNumberMatches.map((match) => match[0])
  const myNumbers = myNumberMatches.map((match) => match[0])

  for (const winningNumber of winningNumbers) {
    if (myNumbers.indexOf(winningNumber) > -1) {
      matchingNumbers +=1
    }
  }

  for (let j=2; j<matchingNumbers + 2; j++) {
    const index = i + j

    if (!extraScratchCardCounts[index]) {
      extraScratchCardCounts[index] = 1
    }

    extraScratchCardCounts[index] += extraScratchCardCounts[i + 1]
  }

  return total + extraScratchCardCounts[i + 1]
}, 0);

console.log(totalScratchCards)
