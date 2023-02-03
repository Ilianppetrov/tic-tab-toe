import { Server, Socket } from "socket.io";

interface Player {
  name: string;
  socketId: string;
}

export type CellOption = null | "X" | "O";
export type Board = [CellOption, CellOption, CellOption][];

export interface Room {
  roomId: string;
  player1: Player;
  player2: Player;
  playerTurn: Player["name"];
  started: boolean;
  finished: boolean;
  winner: string;
  board: Board;
  turn: number;
}

type RoomStore = Record<string, Room>;

export interface Context {
  server: Server;
  socket: Socket;
  roomStore: RoomStore;
}
