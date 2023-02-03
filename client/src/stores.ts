import { createSignal } from "solid-js";
import { Room } from "./types";

const [room, setRoom] = createSignal<Room>({
  roomId: "",
  started: false,
  playerTurn: "",
  player1: {
    name: "",
    socketId: "",
  },
  finished: false,
  winner: "",
});

const [name, setName] = createSignal("");

const nameStore = {
  name,
  setName,
};
const roomStore = {
  room,
  setRoom,
};

export { roomStore, nameStore };
