import { CellOption, Room } from "./types";

export function createRoomId() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function checkWinner(matrix: Room["board"]) {
  let winner: CellOption = null;

  // check for row winner
  for (let row = 0; row < 3; row++) {
    if (
      matrix[row][0] === matrix[row][1] &&
      matrix[row][1] === matrix[row][2] &&
      matrix[row][0] !== null
    ) {
      winner = matrix[row][0];
    }
  }

  // check for column winner
  for (let col = 0; col < 3; col++) {
    if (
      matrix[0][col] === matrix[1][col] &&
      matrix[1][col] === matrix[2][col] &&
      matrix[0][col] !== null
    ) {
      winner = matrix[0][col];
    }
  }

  // check for diagonal winner
  if (
    matrix[0][0] === matrix[1][1] &&
    matrix[1][1] === matrix[2][2] &&
    matrix[0][0] !== null
  ) {
    winner = matrix[0][0];
  }
  if (
    matrix[0][2] === matrix[1][1] &&
    matrix[1][1] === matrix[2][0] &&
    matrix[0][2] !== null
  ) {
    winner = matrix[0][2];
  }

  return winner;
}
