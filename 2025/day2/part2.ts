import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n').filter((line) => line)

const ranges = data[0].split(',')

let totalInvalidIds = 0;

for (const range of ranges) {
  const [min, max] = range.split('-').map((num) => Number(num))

  const maxDigits = max.toString().length

  for (let i=min; i<=max; i+= 1) {
    for (let j=Math.ceil(maxDigits / 2); j>=1; j--) {
      if (i.toString().length % j !== 0) {
        continue;
      }

      if (i.toString().length < j * 2) {
        continue;
      }

      const numberOfRepeats = i.toString().length / j

      if (i.toString().substring(0, j).repeat(numberOfRepeats) === i.toString()) {
        totalInvalidIds += i;
        break;
      }
    }
  }
}

console.log(`the total invalid Ids is ${totalInvalidIds}`)
