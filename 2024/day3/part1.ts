import { readFileSync } from "node:fs";

const data: string = readFileSync('day3/input.txt').toString('utf-8')
const multiplyOperations = data.match(/mul\(\d+,\d+\)/g) || []

const result = multiplyOperations.reduce((total, operation) => {
  const numbers = operation.match(/\d+/g)
  total += Number(numbers![0]) * Number(numbers![1]);
  return total
}, 0)

console.log(result)
