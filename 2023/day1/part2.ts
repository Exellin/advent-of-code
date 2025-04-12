import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n').filter((line) => line)

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const spelledOrActualNumber = ((input: string) => numberMap[input]?.toString() || input)
const reverseString = ((input: string) => Array.from(input).reverse().toString().replaceAll(',', ''));

const sum = data.reduce((total, entry) => {
    const firstNumberString = entry.match(/\d|one|two|three|four|five|six|seven|eight|nine/)![0]

    // searching from the back is needed for strings such as oneight where the found one would mean the eight isn't found
    const lastNumberStringMatch = reverseString(entry).match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/)![0]
    const lastNumberString = reverseString(lastNumberStringMatch)

    const concatNumberString = (spelledOrActualNumber(firstNumberString)).concat(spelledOrActualNumber(lastNumberString))
    return total + Number(concatNumberString);
  }, 0);

console.log(sum)
