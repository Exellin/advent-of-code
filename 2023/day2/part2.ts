import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n').filter((line) => line)

const sumOfPossibleGameIds = data.reduce((total, game, i) => {
  const gamePulls = game.split(`Game ${i + 1}: `)[1].split('; ')

  let minRed = 0, minGreen = 0, minBlue = 0;

  for (const gamePull of gamePulls) {
    const colorQuantityStrings = (gamePull.split(', '))

    for (const colorQuantityString of colorQuantityStrings) {
      const quantity = Number(colorQuantityString.match(/\d+/g)![0])
      const color = colorQuantityString.match(/red|green|blue/g)![0]

      if (color === 'red' && quantity > minRed) {
        minRed = quantity
      }

      if (color === 'green' && quantity > minGreen) {
        minGreen = quantity
      }

      if (color === 'blue' && quantity > minBlue) {
        minBlue = quantity
      }
    }
  }

  return total + minRed * minGreen * minBlue
}, 0);

console.log(sumOfPossibleGameIds)
