import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day7/input.txt').toString('utf-8').split('\n').filter((line) => line)

const beamStartIndex = Array.from(data[0]).findIndex((char) => char === 'S')
const beamStartLine = Array.from(data[1]);
beamStartLine[beamStartIndex] = '|'
data[1] = beamStartLine.join('')

let totalSplits = 0;

const splitBeams = (previousLine: string, currentLine: string, index) => {
  const newLine = Array.from(currentLine)
  const previousBeamIndices = [...previousLine.matchAll(/\|/g)].map((match) => match.index)
  for (const beamIndex of previousBeamIndices) {
    if (currentLine[beamIndex] === '.') {
      newLine[beamIndex] = '|'
    } else if (currentLine[beamIndex] === '^') {
      totalSplits++
      newLine[beamIndex -1] = '|'
      newLine[beamIndex +1] = '|'
    }
  }

  console.log(`the current line will become ${newLine.join('')}`)

  if (data[index + 1]) {
    splitBeams(newLine.join(''), data[index + 1], index + 1)
  } else {
    return
  }
}

splitBeams(data[1], data[2], 2)
console.log(`the beam was split ${totalSplits} times`)
