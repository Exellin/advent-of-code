import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n').filter((line) => line)

const ranges = data[0].split(',')

let totalInvalidIds = 0;

for (const range of ranges) {
  const [min, max] = range.split('-').map((num) => Number(num))

  const maxDigits = max.toString().length
  const minDigits = min.toString().length

  const minLoop = Number(min.toString().substring(0, minDigits / 2))
  const maxLoop = Number(max.toString().substring(0, Math.ceil(maxDigits / 2)))

  for (let i=minLoop; i<=maxLoop; i+= 1) {
    const invalidId = Number(i.toString() + i.toString())

    if (invalidId >= min && invalidId <= max) {
      console.log(invalidId)
      totalInvalidIds += invalidId
    }
  }
}

console.log(`the total invalid Ids is ${totalInvalidIds}`)
