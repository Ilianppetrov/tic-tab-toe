import { Server } from "socket.io";
import {} from "socket-controllers";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  return io;
};
