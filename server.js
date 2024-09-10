import next from "next";
import { createServer } from "node:http";

import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const SWIPE_AND_WATCH_ROOMS = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("join", (data) => {
      const { room, userId } = data;

      const selectedRoom = SWIPE_AND_WATCH_ROOMS[room];
      if (!selectedRoom) {
        SWIPE_AND_WATCH_ROOMS = {
          ...SWIPE_AND_WATCH_ROOMS,
          [room]: { users: [userId] },
        };
      } else {
        if (selectedRoom.users.length === 2) return;
        
        SWIPE_AND_WATCH_ROOMS[room] = {
          ...SWIPE_AND_WATCH_ROOMS[room], users:
          [...users, userId]
        }
      }

    });

    socket.on("swipe", (data) => {
      console.log(data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
