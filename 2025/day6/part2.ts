import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day6/input.txt').toString('utf-8').split('\n').filter((line) => line)
const stringColumns: string[][] = []

for (let i=0; i<data.length - 1; i++) {
  const numbersRow = data[i]

  if (numbersRow) {
    for (let j=0; j<numbersRow.length; j++) {
      if (!stringColumns[j]) {
        stringColumns[j] = []
      }
      stringColumns[j].push(numbersRow[j])
    }
  }
}

const operators = data[data.length - 1]?.match(/\*|\+/g)!
const numberColumns: number[][] = []
let index = 0

for (let i=0; i<stringColumns.length; i++) {
  if (!numberColumns[index]) {
    numberColumns[index] = []
  }

  if (stringColumns[i].every((string) => string === ' ')) {
    index++;
    continue;
  }

  const number = Number(stringColumns[i].join(''))
  numberColumns[index].push(number)
}

const finalResult = numberColumns.reduce((total, column, index) => {
  const operator = operators[index];

  if (operator === '+') {
    return total += column.reduce((columnTotal, number) => {
      console.log(`adding ${number} to ${columnTotal}`)
      return columnTotal += number
    }, 0)
  }

  if (operator === '*') {
    return total += column.reduce((columnTotal, number) => {
      console.log(`mulitypling ${number} by ${columnTotal}`)
      return columnTotal *= number
    }, 1)
  }

  return total;
}, 0);

console.log(finalResult)
