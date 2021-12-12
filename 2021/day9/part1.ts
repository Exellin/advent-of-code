import fs from 'fs';

const data = fs.readFileSync('day9/input.txt').toString('utf-8').split('\n');
const heightMap = data.filter((line) => line.length > 0).map((value) => Array.from(value).map((value) => Number(value)));
let totalRisk = 0;

for (let i=0; i<heightMap.length; i++) {
  const row = heightMap[i];
  const lowPoints = row.filter((point, j) => {
    if (heightMap[i-1] && heightMap[i-1][j] <= point) {
      return false;
    }

    if (heightMap[i+1] && heightMap[i+1][j] <= point) {
      return false;
    }

    if (heightMap[i][j-1] !== undefined && heightMap[i][j-1] <= point) {
      return false;
    }

    if (heightMap[i][j+1] !== undefined && heightMap[i][j+1] <= point) {
      return false;
    }

    return true;
  });

  const risk = lowPoints.reduce((total, point) => {
    return total += point + 1;
  }, 0);

  totalRisk += risk;
}

console.log(`The total risk is ${totalRisk}`);
