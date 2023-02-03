import { checkWinner, createRoomId } from "../helpers";
import { Context } from "../types";

export const createRoom =
  ({ socket, roomStore }: Context) =>
  (name: string) => {
    const newRoomId = createRoomId();

    socket.join(newRoomId);

    roomStore[newRoomId] = {
      roomId: newRoomId,
      player1: {
        name,
        socketId: socket.id,
      },
      player2: {
        name: "",
        socketId: "",
      },
      playerTurn: name,
      started: false,
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turn: 0,
      finished: false,
      winner: "",
    };

    socket.emit("create_room_success", roomStore[newRoomId]);

    return;
  };

export const joinRoom =
  ({ socket, roomStore, server }: Context) =>
  ({ roomId, name }: { roomId: string; name: string }) => {
    const room = roomStore[roomId];
    const socketRoom = server.sockets.adapter.rooms.get(roomId);
    if (!room || !socketRoom) {
      socket.emit("join_room_error", { error: "No such room" });
      return;
    }

    if (socketRoom.size === 2) {
      socket.emit("join_room_error", { error: "Room is full" });
      return;
    }

    socket.join(roomId);

    room.player2 = {
      name,
      socketId: socket.id,
    };
    room.started = true;

    // socket.emit("create_room_success", room);
    server.in(roomId).emit("join_room_success", room);

    return;
  };
export const updateBoard =
  ({ socket, roomStore, server }: Context) =>
  ({
    roomId,
    rowIndex,
    colIndex,
  }: {
    roomId: string;
    rowIndex: number;
    colIndex: number;
  }) => {
    const room = roomStore[roomId];
    if (!room) {
      socket.emit("update_board_error", { error: "No such room" });
      return;
    }

    if (room.playerTurn === room.player1.name) {
      room.board[rowIndex][colIndex] = "X";
      room.playerTurn = room.player2?.name;
    } else {
      room.board[rowIndex][colIndex] = "O";
      room.playerTurn = room.player1?.name;
      ``;
    }
    room.turn += 1;

    const winner = checkWinner(room.board);

    room.finished = !!winner;
    room.winner = winner || "";

    if (room.turn === 9) {
      room.finished = true;
      room.winner = "tie";
    }

    // socket.emit("create_room_success", room);
    server.in(roomId).emit("update_board_success", room);

    return;
  };
export const restartGame =
  ({ socket, roomStore, server }: Context) =>
  ({ roomId }: { roomId: string }) => {
    const room = roomStore[roomId];
    if (!room) {
      socket.emit("update_board_error", { error: "No such room" });
      return;
    }

    roomStore[roomId] = {
      ...roomStore[roomId],
      playerTurn: room.player1.name,
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turn: 0,
      finished: false,
      winner: "",
    };

    const updatedRoom = roomStore[roomId];

    // socket.emit("create_room_success", room);
    server.in(roomId).emit("update_board_success", updatedRoom);

    return;
  };
