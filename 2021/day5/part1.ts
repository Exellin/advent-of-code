import fs from 'fs';

type GridPoint = {
  x: number,
  y: number
  hits: number
}

const grid: GridPoint[] = [];
const data = fs.readFileSync('day5/input.txt').toString('utf-8').split('\n');
const straightLines = data.map((textLine) => textLine.split(' -> '))
                          .map((coordinateArray) => coordinateArray
                            .map((coordinatePair) => coordinatePair.split(',')))
                          .filter((line) => line.length === 2 && (line[0][0] === line[1][0] || line[0][1] === line[1][1]))
                          .map((line) => line
                            .map((coordinatePair) => coordinatePair
                            .map((coordinate) => Number(coordinate))));

for (const line of straightLines) {
  const startXPoint = Math.min(line[0][0], line[1][0]);
  const endXPoint = Math.max(line[0][0], line[1][0]);
  const startYPoint = Math.min(line[0][1], line[1][1]);
  const endYPoint = Math.max(line[0][1], line[1][1]);

  if (endXPoint > startXPoint) {
    for (let x=startXPoint; x <= endXPoint; x++) {
      const gridPoint = grid.find((gridPoint) => gridPoint.x === x && gridPoint.y === startYPoint);
      if (gridPoint) {
        gridPoint.hits++;
      } else {
        grid.push({
          x,
          y: startYPoint,
          hits: 1
        });
      }
    }
  }

  if (endYPoint > startYPoint) {
    for (let y=startYPoint; y <= endYPoint; y++) {
      const gridPoint = grid.find((gridPoint) => gridPoint.y === y && gridPoint.x === startXPoint);
      if (gridPoint) {
        gridPoint.hits++;
      } else {
        grid.push({
          x: startXPoint,
          y,
          hits: 1
        });
      }
    }
  }
}

console.log(`The number of points with at least 2 lines is ${grid.filter((gridPoint) => gridPoint.hits > 1).length}`);
