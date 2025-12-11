import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day7/input.txt').toString('utf-8').split('\n').filter((line) => line)
const totalNumberOfPaths : number[][] = [];

for (let i=0; i<data.length; i++) {
  const chars = Array.from(data[i])
  const rowPathsCount: number[] = [];
  for (let j=0; j<chars.length; j++) {
    // console.log(`looking at char ${chars[j]} at index ${j} and line ${i}`)
    rowPathsCount[j] = 0;

    if (i === 0) { // the first line
      switch (chars[j]) {
        case 'S':
          rowPathsCount[j] += 1
    }} else { // all other lines
      if (chars[j] === '^') {
        continue;
      }

      if (totalNumberOfPaths[i-1]?.[j+1] > 0 && chars[j+1] === '^') {
        // console.log('a split is ahead and there is a beam above')
        rowPathsCount[j] += totalNumberOfPaths[i-1][j+1]
      }

      if (totalNumberOfPaths[i-1]?.[j-1] > 0 && chars[j-1] === '^') {
        // console.log('a split is behind and there is a beam above')
        rowPathsCount[j] += totalNumberOfPaths[i-1][j-1]
      }

      if (totalNumberOfPaths[i-1][j] > 0) {
        // console.log('there is no split nearby but a beam above')
        rowPathsCount[j] += totalNumberOfPaths[i-1][j]
      }
    }
  }
  // console.log(`pushing ${rowPathsCount} for ${data[i]}`)
  totalNumberOfPaths.push(rowPathsCount)
}

console.log(`the final line is ${totalNumberOfPaths[totalNumberOfPaths.length -1]}`)
console.log(`the total number of paths are ${totalNumberOfPaths[totalNumberOfPaths.length -1].reduce((total, paths) => total += paths, 0)}`)
