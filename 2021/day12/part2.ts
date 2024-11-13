import { readFileSync } from "node:fs";

// lots of room for improvement here, had to run this overnight
const connections: string[] = readFileSync('day12/input.txt').toString('utf-8').split('\n').filter((line: string) => line.length > 0);
const uniqueRooms: string[] = [];
const possiblePaths: string[][] = [];

for (const connection of connections) {
  const rooms = connection.split('-');
  for (const room of rooms) {
    if (!uniqueRooms.includes(room)) {
      uniqueRooms.push(room);
    }
  }

  if (connection.includes('start')) {
    const connectingCavern = connection.split('-').find((cavern) => cavern !== 'start');
    if (connectingCavern) {
      possiblePaths.push(['start', connectingCavern]);
    }
  }
}

const smallCaverns = uniqueRooms.filter((room) => room.toLowerCase() === room);

while (!possiblePaths.every((path) => path[path.length-1] === 'end')) {
  possiblePaths.filter((path) => path[path.length-1] !== 'end').forEach((path) => {
    const pathIndex = possiblePaths.findIndex((possiblePath) => possiblePath.join() === path.join());
    possiblePaths.splice(pathIndex, 1);

    const currentEndingCavern = path[path.length -1];
    const connectionsForCurrentPath = connections.filter((connection) => {
      return ((connection.includes(`-${currentEndingCavern}`)) || (connection.includes(`${currentEndingCavern}-`)));
    });
    const hasVisitedAnySmallCavernTwice = smallCaverns.find((room) => path.filter((cavern) => room === cavern).length > 1);

    for (const connection of connectionsForCurrentPath) {
      const connectingCavern = connection.split('-').find((cavern) => cavern !== currentEndingCavern);

      if (connectingCavern) {
        const isBigCavern = connectingCavern.toLowerCase() !== connectingCavern;
        const isSmallCavern = connectingCavern.toLowerCase() === connectingCavern;
        const isStartOrEnd = connectingCavern === 'start' || connectingCavern === 'end';
        const isVisitedSmallCavern = isSmallCavern && path.includes(connectingCavern);
        const isDuplicateStartOrEnd = isVisitedSmallCavern && isStartOrEnd;
        const isUnvisitedSmallCavern = isSmallCavern && !path.includes(connectingCavern);
        const isValidSmallCavern = hasVisitedAnySmallCavernTwice ? isUnvisitedSmallCavern : !isDuplicateStartOrEnd;

        if (isBigCavern || isValidSmallCavern) {
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
