import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day5/input.txt').toString('utf-8').split('\n')

const emptyLineIndex = data.findIndex((line) => line === '')

const originalRanges = data.slice(0, emptyLineIndex).map((range) => range.split('-').map((rangeEnd) => Number(rangeEnd)))

let validFreshIds = 0
let finalSortedRanges: number[][] = [];

const filterRanges = ((ranges) => {
  const sortedRanges: number[][] = []

  for (const range of ranges) {
    // lower bound is between an existing range
    const maxConflictIndex = sortedRanges.findIndex((sortedRange) => sortedRange[0] <= range[0] && sortedRange[1] >= range[0])

    // upper bound is between an existing range
    const minConflictIndex = sortedRanges.findIndex((sortedRange) => sortedRange[0] <= range[1] && sortedRange[1] >= range[1])

    // both bounds are outside an existing range
    const boundConflictIndex = sortedRanges.findIndex((sortedRange) => sortedRange[0] >= range[0] && sortedRange[1] <= range[1])

    if (minConflictIndex >=0 ) {
      const minConflict = sortedRanges[minConflictIndex]
      console.log(`there is a min conflict between ${minConflict} and ${range}`)
      console.log(`setting ${sortedRanges[minConflictIndex][0]} to ${Math.min(minConflict[0], range[0])}`)
      sortedRanges[minConflictIndex][0] = Math.min(minConflict[0], range[0])
    }

    if (maxConflictIndex >=0 ) {
      const maxConflict = sortedRanges[maxConflictIndex]
      console.log(`there is a max conflict between ${maxConflict} and ${range}`)
      console.log(`setting ${sortedRanges[maxConflictIndex][1]} to ${Math.max(maxConflict[1], range[1])}`)
      sortedRanges[maxConflictIndex][1] = Math.max(maxConflict[1], range[1])
    }

    if (boundConflictIndex >= 0) {
      const boundConflict = sortedRanges[boundConflictIndex]
      console.log(`there is a bound conflict between ${boundConflict} and ${range}`)
      console.log(`setting ${sortedRanges[boundConflictIndex][0]} to ${Math.min(boundConflict[0], range[0])}`)
      console.log(`setting ${sortedRanges[boundConflictIndex][1]} to ${Math.max(boundConflict[1], range[1])}`)
      sortedRanges[boundConflictIndex][0] = Math.min(boundConflict[0], range[0])
      sortedRanges[boundConflictIndex][1] = Math.max(boundConflict[1], range[1])
    }

    if (minConflictIndex < 0 && maxConflictIndex < 0 && boundConflictIndex < 0) {
      sortedRanges.push(range)
    }
  }

  if (sortedRanges.length === ranges.length) {
    finalSortedRanges = sortedRanges;
  } else {
    console.log('filtering more ranges')
    filterRanges(sortedRanges)
  }
})

filterRanges(originalRanges)

for (const range of finalSortedRanges) {
  validFreshIds += (range[1] - range[0] + 1)
}

console.log(finalSortedRanges)
console.log(validFreshIds)
