import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n').filter((line) => line)

const XMAScount = data.reduce((total, line, lineIndex) => {
  total += Array.from(line).reduce((crosses, char, charIndex) => {
    if (!data[lineIndex + 2] || !data[lineIndex + 2][charIndex + 2]) {
      return crosses
    }

    const hasForwardCross = (char === 'M' && data[lineIndex + 1][charIndex + 1] === 'A' && data[lineIndex + 2][charIndex + 2] === 'S') ||
                            (char === 'S' && data[lineIndex + 1][charIndex + 1] === 'A' && data[lineIndex + 2][charIndex + 2] === 'M')

    const hasbackwardsCross = (data[lineIndex][charIndex + 2] === 'M' && data[lineIndex + 1][charIndex + 1] === 'A' && data[lineIndex + 2][charIndex] === 'S') ||
                              (data[lineIndex][charIndex + 2] === 'S' && data[lineIndex + 1][charIndex + 1] === 'A' && data[lineIndex + 2][charIndex] === 'M')

    if (hasForwardCross && hasbackwardsCross) {
      crosses++
      return crosses
    }

    return crosses
  }, 0)

  return total
}, 0)

console.log(XMAScount)
