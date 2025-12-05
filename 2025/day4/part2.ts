import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n').filter((line) => line)

let totalRemovedPapers = 0;

const removePapers = () => {
  let availablePapers = 0;


  for (let i=0; i<data.length; i++) {
    let rowCopy = Array.from(data[i]);
    for (let j=0; j<data[i].length; j++) {
      if (data[i][j] === '@') {
        const adjacentPapers = [
          data[i-1]?.[j-1], data[i-1]?.[j], data[i-1]?.[j+1],
          data[i]?.[j-1], data[i]?.[j+1],
          data[i+1]?.[j-1], data[i+1]?.[j], data[i+1]?.[j+1]
        ].filter((element) => element === '@').length

        if (adjacentPapers < 4) {
          availablePapers++
          rowCopy[j] = 'x'
        }
      }
      data[i] = rowCopy.join('')
    }
  }

  totalRemovedPapers += availablePapers
  return availablePapers
}

while (removePapers() !== 0) {
  console.log('removing more papers')
}

console.log(totalRemovedPapers)
