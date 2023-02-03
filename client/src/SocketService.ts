import { Socket, io } from "socket.io-client";
import { Room } from "./types";

class SocketService {
  public socket: Socket | undefined;
  public roomId: string | undefined;

  constructor() {
    this.socket = io("ws://localhost:3010/");
    console.log("connected");
  }
  //   public connect() {
  //     return new Promise((resolve) => {
  //       resolve(this.socket);
  //     });
  //   }

  public createRoom(name: string): Promise<Room> {
    return new Promise((resolve) => {
      this.socket?.emit("create_room", name);
      this.socket?.on("create_room_success", (room) => {
        this.roomId = room.roomId;
        resolve(room);
      });
    });
  }
  public joinRoom(payload: { roomId: string; name: string }) {
    return new Promise((resolve, reject) => {
      this.socket?.emit("join_room", payload);
      this.socket?.on("join_room_success", (room) => {
        this.roomId = room.roomId;
        resolve(room);
      });
      this.socket?.on("join_room_error", ({ error }) => {
        reject(error);
      });
    });
  }

  public onJoin(cb: (room: Room) => void) {
    this.socket?.on("join_room_success", cb);
  }

  public updateBoard(payload: { rowIndex: number; colIndex: number }) {
    this.socket?.emit("update_board", { roomId: this.roomId, ...payload });
  }

  public onUpdateBoard(cb: (room: Room) => void) {
    this.socket?.on("update_board_success", cb);
  }

  public restartGame() {
    this.socket?.emit("restart_game", { roomId: this.roomId });
  }
}

export default new SocketService();
