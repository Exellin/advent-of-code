import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day5/input.txt').toString('utf-8').split('\n')

const emptyLineIndex = data.findIndex((line) => line === '')

const ranges = data.slice(0, emptyLineIndex)
const fruitIds = data.slice(emptyLineIndex).filter((line) => line)
let freshFruits = 0;

for (const fruitId of fruitIds) {
  for (const range of ranges) {
    const rangeEnds = range.split('-').map((range) => Number(range))
    if (rangeEnds[0] <= Number(fruitId) && rangeEnds[1] >= Number(fruitId)) {
      console.log(`fruit id ${fruitId} is fresh in ${range}`)
      freshFruits++
      break
    }
  }
}

console.log(freshFruits)
