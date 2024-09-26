import next from "next";
import { createServer } from "node:http";

import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const SWIPE_AND_WATCH_ROOMS = {};

const movies = await fetchMovies();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    
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

      socket.emit("room", {  userId, movies, room: SWIPE_AND_WATCH_ROOMS[room] });


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

async function fetchMovies () { 
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=cd7ab32ae03fba9539c7c1b601c50486"
    );
    // const response = await fetch(
    //   `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIES_API_TOKEN}`
    // );
    const data = await response.json();
    return data.results
}