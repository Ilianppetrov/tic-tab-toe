import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import {
  createRoom,
  joinRoom,
  restartGame,
  updateBoard,
} from "./controllers/roomController";
import { Context } from "./types";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("test");
});

const roomStore = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  const context: Context = {
    server: io,
    socket,
    roomStore,
  };

  socket.on("create_room", createRoom(context));
  socket.on("join_room", joinRoom(context));
  socket.on("update_board", updateBoard(context));
  socket.on("restart_game", restartGame(context));
});

server.listen(process.env.PORT, () => {
  console.log("listening on ", process.env.PORT);
});
