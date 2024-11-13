import { readFileSync } from "node:fs";

type GridPoint = {
  x: number,
  y: number
  hits: number
}

const grid: GridPoint[] = [];
const data: string[] = readFileSync('day5/input.txt').toString('utf-8').split('\n');
const lines = data.map((textLine) => textLine.split(' -> '))
                          .map((coordinateArray) => coordinateArray
                            .map((coordinatePair) => coordinatePair.split(',')))
                          .filter((line) => line.length === 2)
                          .map((line) => line
                            .map((coordinatePair) => coordinatePair
                            .map((coordinate) => Number(coordinate))));


const interpolatedValue = ({start, end, index}: {start: number, end: number, index: number}) => {
  if (end > start) { return start + index; }
  if (start > end) { return start - index; }
  return start; // if start and end are equal
};

for (const line of lines) {
  const startXPoint = line[0][0];
  const endXPoint = line[1][0];
  const startYPoint = line[0][1];
  const endYPoint = line[1][1];
  const xChange = endXPoint - startXPoint;
  const yChange = endYPoint - startYPoint;
  const lineLength = Math.max(Math.abs(xChange), Math.abs(yChange)) + 1;

  for (let i=0; i < lineLength; i++) {
    const x = interpolatedValue({start: startXPoint, end: endXPoint, index: i});
    const y = interpolatedValue({start: startYPoint, end: endYPoint, index: i});

    const gridPoint = grid.find((gridPoint) => gridPoint.x === x && gridPoint.y === y);
    if (gridPoint) {
      gridPoint.hits++;
    } else {
      grid.push({
        x,
        y,
        hits: 1
      });
    }
  }
}

console.log(`The number of points with at least 2 lines is ${grid.filter((gridPoint) => gridPoint.hits > 1).length}`);
