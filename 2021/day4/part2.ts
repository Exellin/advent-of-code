import fs from 'fs';

type BingoNumber = {
  x: number,
  y: number,
  hit: boolean,
  value: string
};

type BingoBoard = {
  bingoNumbers: BingoNumber[],
  won: boolean
}

const data = fs.readFileSync('day4/input.txt').toString('utf-8').split('\n');
const drawnBingoNumbers = data.shift()?.split(',') || [];
const bingoBoards: Array<BingoBoard> = [];
const BOARD_SIZE = 5;
let bingoBoard: BingoBoard = {
  bingoNumbers: [],
  won: false
};
let y = 0;

const checkForWin = (board: BingoNumber[]) => {
  const hits = board.filter((bingoNumber) => bingoNumber.hit);

  if (hits.length < BOARD_SIZE) {
    return false;
  }

  for (let i = 0; i < BOARD_SIZE; i++) {
    // row
    if (hits.filter((hit) => hit.y === i).length === BOARD_SIZE) {
      return true;
    }

    // column
    if (hits.filter((hit) => hit.x === i).length === BOARD_SIZE) {
      return true;
    }
  }

  return false;
};

const drawNumbersToLastWin = () => {
  for (let i = 0; i < drawnBingoNumbers.length; i++) {
    for (let j = 0; j < bingoBoards.length; j++) {
      const matches = bingoBoards[j].bingoNumbers.filter((entry) => entry.value === drawnBingoNumbers[i]);

      for (const match of matches) {
        const index = bingoBoards[j].bingoNumbers.findIndex((entry) => entry.x === match.x && entry.y === match.y);
        bingoBoards[j].bingoNumbers[index].hit = true;

        if (checkForWin(bingoBoards[j].bingoNumbers)) {
          bingoBoards[j].won = true;

          if (bingoBoards.every((board) => board.won === true)) {
            const sumUndrawnNumbers = bingoBoards[j].bingoNumbers.reduce((total, bingoNumber) => {
              if (bingoNumber.hit) {
                return total;
              } else {
                return total + Number(bingoNumber.value);
              }
            }, 0);

            return Number(drawnBingoNumbers[i]) * sumUndrawnNumbers;
          }
        }
      }
    }
  }

  return null;
};

for (const row of data) {
  if (row === '') {
    if (bingoBoard.bingoNumbers.length > 0) {
      bingoBoards.push(bingoBoard);
      bingoBoard = {
        bingoNumbers: [],
        won: false
      };
      y = 0;
    }
  } else {
    bingoBoard.bingoNumbers = [...bingoBoard.bingoNumbers, ...row.split(' ').filter((entry) => entry !== '').map((entry, index) => (
      {x: index, y, hit: false, value: entry}
    ))];
    y++;
  }
}

console.log(`The last board to win has a result of ${drawNumbersToLastWin()}`);
