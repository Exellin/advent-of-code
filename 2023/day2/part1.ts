import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n').filter((line) => line)

const possibleCubes = {
  red: 12,
  green: 13,
  blue: 14
}

const sumOfPossibleGameIds = data.reduce((total, game, i) => {
  const gameId = i + 1;
  const gamePulls = game.split(`Game ${gameId}: `)[1].split('; ')

  for (const gamePull of gamePulls) {
    const colorQuantityStrings = (gamePull.split(', '))

    for (const colorQuantityString of colorQuantityStrings) {
      const quantity = colorQuantityString.match(/\d+/g)![0]
      const color = colorQuantityString.match(/red|green|blue/g)![0]

      if (quantity > possibleCubes[color]) {
        return total;
      }
    }
  }

  return total + gameId
}, 0);

console.log(sumOfPossibleGameIds)
