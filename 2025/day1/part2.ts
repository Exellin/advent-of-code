import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n').filter((line) => line)

let position = 50;
let zeroCount = 0;

for (const instruction of data) {
  const direction = instruction[0];
  const totalAmount = Number(instruction.split(direction)[1])

  const turnAmount = totalAmount % 100
  zeroCount += (Math.abs(totalAmount) - Math.abs(turnAmount)) / 100

  const originalPosition = position;

  if (direction === 'L') {
    position -= turnAmount
  } else if (direction === 'R') {
    position += turnAmount
  }

  if (position < 0) {

    if (originalPosition !== 0) {
      zeroCount += 1;
    }

    position += 100
  } else if (position > 99) {

    if (position > 100) {
      zeroCount += 1;
    }

    position -= 100
  }

  if (position === 0) {
    zeroCount++
  }

  console.log(`position ${position} and zeroCount ${zeroCount}`)
}

console.log(zeroCount)
