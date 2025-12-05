import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n').filter((line) => line)

let availablePapers = 0;

for (let i=0; i<data.length; i++) {
  for (let j=0; j<data[i].length; j++) {
    if (data[i][j] === '@') {
      const adjacentPapers = [
        data[i-1]?.[j-1], data[i-1]?.[j], data[i-1]?.[j+1],
        data[i]?.[j-1], data[i]?.[j+1],
        data[i+1]?.[j-1], data[i+1]?.[j], data[i+1]?.[j+1]
      ].filter((element) => element === '@').length

      if (adjacentPapers < 4) {
        availablePapers++
      }
      console.log(`at ${i}, ${j}, there are ${adjacentPapers} adjacent papers`)
    }
  }
}

console.log(availablePapers)
