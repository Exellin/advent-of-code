import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n').filter((line) => line)

const reportIsSafe = ((report: number[], allowOneFault = false) => {
  let direction = '';
  let isSafe = true

  for (let i=0; i < report.length; i++) {
    if (allowOneFault && reportIsSafe([...report.slice(0, i), ...report.slice(i + 1, report.length)])) {
      break
    }

    if (Math.abs(report[i] - report[i-1]) > 3 || Math.abs(report[i] - report[i-1]) < 1) {
      isSafe = false
      break
    }

    if (i === 1) {
      direction = report[i] > report[i-1] ? 'increasing' : 'decreasing'
    }

    if (report[i] > report[i-1] && direction === 'decreasing') {
      isSafe = false
      break
    }

    if (report[i] < report[i-1] && direction === 'increasing') {
      isSafe = false
      break
    }
  }

  return isSafe
});

const safeReports = data.reduce((safeReports, report) => {
  if (reportIsSafe(report.split(' ').map((level) => Number(level)), true)) {
    safeReports++
  }

  return safeReports;
}, 0)

console.log(safeReports)
