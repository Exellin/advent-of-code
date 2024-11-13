import { readFileSync } from "node:fs";

const connections: string[] = readFileSync('day12/input.txt').toString('utf-8').split('\n').filter((line: string) => line.length > 0);
const possiblePaths: string[][] = [];

for (const connection of connections) {
  if (connection.includes('start')) {
    const connectingCavern = connection.split('-').find((cavern) => cavern !== 'start');
    if (connectingCavern) {
      possiblePaths.push(['start', connectingCavern]);
    }
  }
}

while (!possiblePaths.every((path) => path[path.length-1] === 'end')) {
  possiblePaths.filter((path) => path[path.length-1] !== 'end').forEach((path) => {
    const pathIndex = possiblePaths.findIndex((possiblePath) => possiblePath.join() === path.join());
    possiblePaths.splice(pathIndex, 1);

    const currentEndingCavern = path[path.length -1];
    const connectionsForCurrentPath = connections.filter((connection) => {
      return ((connection.includes(`-${currentEndingCavern}`)) || (connection.includes(`${currentEndingCavern}-`)));
    });

    for (const connection of connectionsForCurrentPath) {
      const connectingCavern = connection.split('-').find((cavern) => cavern !== currentEndingCavern);

      if (connectingCavern) {
        const isBigCavern = connectingCavern.toLowerCase() !== connectingCavern;
        const isSmallCavern = connectingCavern.toLowerCase() === connectingCavern;
        const isUnvisitedSmallCavern = isSmallCavern && !path.includes(connectingCavern);

        if (isBigCavern || isUnvisitedSmallCavern) {
          const newPath = [...path, connectingCavern];
          if (!possiblePaths.find((possiblePath) => newPath.join('') === possiblePath.join(''))) {
            possiblePaths.push([...path, connectingCavern]);
          }
        }
      }
    }
  });
}

console.log(`There are ${possiblePaths.length} possible paths through this cave`);
