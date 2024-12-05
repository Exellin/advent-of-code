import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n').filter((line) => line)

const horizontalXmasCount = data.reduce((total, line) => {
  total += line.match(/XMAS/g)?.length || 0
  return total;
}, 0)

const backwardsXmasCount = data.reduce((total, line) => {
  total += line.match(/SAMX/g)?.length || 0
  return total;
}, 0)

const verticalXmasCount = data.reduce((total, line, lineIndex) => {
  total += Array.from(line).reduce((verticals, char, charIndex) => {
    if (!data[lineIndex + 3]) {
      return verticals
    }

    if (char === 'S' && data[lineIndex + 1][charIndex] === 'A' && data[lineIndex + 2][charIndex] === 'M' && data[lineIndex + 3][charIndex] === 'X') {
      verticals++;
      return verticals
    }

    if (char === 'X' && data[lineIndex + 1][charIndex] === 'M' && data[lineIndex + 2][charIndex] === 'A' && data[lineIndex + 3][charIndex] === 'S') {
      verticals++;
      return verticals
    }

    return verticals
  }, 0)

  return total
}, 0)

const forwardDiagonalCount = data.reduce((total, line, lineIndex) => {
  total += Array.from(line).reduce((forwardDiagonals, char, charIndex) => {
    if (!data[lineIndex + 3] || !data[lineIndex + 3][charIndex + 3]) {
      return forwardDiagonals
    }

    if (char === 'S' && data[lineIndex + 1][charIndex + 1] === 'A' && data[lineIndex + 2][charIndex + 2] === 'M' && data[lineIndex + 3][charIndex + 3] === 'X') {
      forwardDiagonals++;
      return forwardDiagonals
    }

    if (char === 'X' && data[lineIndex + 1][charIndex + 1] === 'M' && data[lineIndex + 2][charIndex + 2] === 'A' && data[lineIndex + 3][charIndex + 3] === 'S') {
      forwardDiagonals++;
      return forwardDiagonals
    }

    return forwardDiagonals
  }, 0)

  return total
}, 0)

const backwardDiagonalCount = data.reduce((total, line, lineIndex) => {
  total += Array.from(line).reduce((backwardsDiagonals, char, charIndex) => {
    if (!data[lineIndex + 3] || !data[lineIndex + 3][charIndex -3]) {
      return backwardsDiagonals
    }

    if (char === 'S' && data[lineIndex + 1][charIndex - 1] === 'A' && data[lineIndex + 2][charIndex - 2] === 'M' && data[lineIndex + 3][charIndex - 3] === 'X') {
      backwardsDiagonals++;
      return backwardsDiagonals
    }

    if (char === 'X' && data[lineIndex + 1][charIndex - 1] === 'M' && data[lineIndex + 2][charIndex - 2] === 'A' && data[lineIndex + 3][charIndex - 3] === 'S') {
      backwardsDiagonals++;
      return backwardsDiagonals
    }

    return backwardsDiagonals
  }, 0)

  return total
}, 0)

const total = horizontalXmasCount + backwardsXmasCount + verticalXmasCount + forwardDiagonalCount + backwardDiagonalCount

console.log(total)
