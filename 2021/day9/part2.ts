import { readFileSync } from "node:fs";

class Point {
  visited: boolean;
  elevation: number;
  lowPoint: boolean;
  basinId?: number;
  x?: number;
  y?: number;

  constructor({visited, elevation, lowPoint, basinId, x, y}: {visited?: boolean, elevation: number, lowPoint?: boolean, basinId?: number, x?: number, y?: number}) {
    this.visited = visited || false;
    this.elevation = elevation;
    this.lowPoint = lowPoint || false;
    this.basinId = basinId;
    this.x = x;
    this.y = y;
  }

  spawnWalker(heightMap: Point[][]) {
    this.visited = true;
    const stack: Point[] = [this];
    let current: Point | undefined;

    while (stack.length > 0) {
      current = stack.pop();
      if (current) {
        const nextUnvisitedNeightbor = current.nextUnvisitedNeightbor(heightMap);
        if (nextUnvisitedNeightbor) {
          nextUnvisitedNeightbor.visited = true;
          nextUnvisitedNeightbor.basinId = this.basinId;
          stack.push(nextUnvisitedNeightbor);
        }
      }
    }
  }

  nextUnvisitedNeightbor(heightMap: Point[][]): undefined | Point {
    if (this.x === undefined || this.y === undefined) {
      throw new Error('point needs coordinates to find neighbors');
    }

    const unvisitedNeighbors = [];

    if (heightMap[this.y-1] && !heightMap[this.y-1][this.x].visited && heightMap[this.y-1][this.x].elevation < MAX_HEIGHT) {
      unvisitedNeighbors.push(heightMap[this.y-1][this.x]);
    }

    if (heightMap[this.y+1] && !heightMap[this.y+1][this.x].visited && heightMap[this.y+1][this.x].elevation < MAX_HEIGHT) {
      unvisitedNeighbors.push(heightMap[this.y+1][this.x]);
    }

    if (heightMap[this.y][this.x-1] !== undefined && !heightMap[this.y][this.x-1].visited && heightMap[this.y][this.x-1].elevation < MAX_HEIGHT) {
      unvisitedNeighbors.push(heightMap[this.y][this.x-1]);
    }

    if (heightMap[this.y][this.x+1] !== undefined && !heightMap[this.y][this.x+1].visited && heightMap[this.y][this.x+1].elevation < MAX_HEIGHT) {
      unvisitedNeighbors.push(heightMap[this.y][this.x+1]);
    }

    const firstNeighbor = unvisitedNeighbors.pop();

    for (const neightbor of unvisitedNeighbors) {
      neightbor.basinId = this.basinId;
      neightbor.visited = true;
      neightbor.spawnWalker(heightMap);
    }

    return firstNeighbor;
  }
}

const MAX_HEIGHT = 9;
const data: string[] = readFileSync('day9/input.txt').toString('utf-8').split('\n');
const heightMap: Point[][] = data.filter((line) => line.length > 0).map((value) => Array.from(value).map((value) => {
  return new Point({elevation: Number(value)});
}));
const basinSizes: any = {};
let basinId = 1;

for (let i=0; i<heightMap.length; i++) {
  const row = heightMap[i];

  for (let j=0; j<row.length; j++) {
    const point = heightMap[i][j];
    point.x = j;
    point.y = i;

    if(point.basinId) {
      continue;
    }

    if (heightMap[i-1] && heightMap[i-1][j].elevation <= point.elevation) {
      continue;
    }

    if (heightMap[i+1] && heightMap[i+1][j].elevation <= point.elevation) {
      continue;
    }

    if (heightMap[i][j-1] !== undefined && heightMap[i][j-1].elevation <= point.elevation) {
      continue;
    }

    if (heightMap[i][j+1] !== undefined && heightMap[i][j+1].elevation <= point.elevation) {
      continue;
    }

    point.lowPoint = true;
    point.basinId = basinId;
    basinId++;
  }
}

for (let i=0; i<heightMap.length; i++) {
  const row = heightMap[i];
  const lowPoints = row.filter((point) => point.lowPoint === true);
  lowPoints.forEach((lowPoint) => lowPoint.spawnWalker(heightMap));
}

for (let i=0; i<heightMap.length; i++) {
  const row = heightMap[i];
  for (let j=0; j<row.length; j++) {
    const point = heightMap[i][j];
    if (point.basinId) {
      basinSizes[point.basinId] = basinSizes[point.basinId] + 1 || 1;
    }
  }
}

const largestBasinSizes = [];
const basinSizeValues = Object.values(basinSizes).map((value) => Number(value));

while (largestBasinSizes.length < 3) {
  const maxBasinSizeIndex = basinSizeValues.findIndex((value) => value === Math.max(...basinSizeValues));
  largestBasinSizes.push(basinSizeValues[maxBasinSizeIndex]);
  basinSizeValues.splice(maxBasinSizeIndex, 1);
}

const product = largestBasinSizes.reduce((total, value) => {
  return total * value;
}, 1);

console.log(`The product of the 3 largest basin sizes is ${product}`);
