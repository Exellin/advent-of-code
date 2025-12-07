import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day6/input.txt').toString('utf-8').split('\n').filter((line) => line)
const numberColumns: number[][] = []

for (let i=0; i<data.length - 1; i++) {
  const numbersRow = data[i].match(/\d+/g)?.map((numberString) => Number(numberString))

  if (numbersRow) {
    for (let j=0; j<numbersRow.length; j++) {
      if (!numberColumns[j]) {
        numberColumns[j] = []
      }
      numberColumns[j].push(numbersRow[j])
    }
  }
}

const operators = data[data.length - 1]?.match(/\*|\+/g)!

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
