import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n').filter((line) => line)
const delimeter = '   '

const list1 = data.map((row) => Number(row.split(delimeter)[0])).sort()
const list2 = data.map((row) => Number(row.split(delimeter)[1])).sort()

// part 1
const diff = list1.reduce((total, entry, index) => total + Math.abs(entry - list2[index]), 0);
console.log(diff)

// part 2
const similarity = list1.reduce((total, entry) => total + entry * list2.filter((num) => num === entry).length, 0);
console.log(similarity)
