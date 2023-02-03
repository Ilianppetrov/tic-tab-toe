export interface Player {
  name: string;
  socketId: string;
}

type CellOption = null | "X" | "O";

export interface Room {
  roomId: string;
  player1: Player;
  player2?: Player;
  playerTurn: Player["name"];
  started: boolean;
  finished: boolean;
  winner: string;
  board?: [CellOption, CellOption, CellOption][];
}
