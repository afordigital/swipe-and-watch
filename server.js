import next from "next";
import { createServer } from "node:http";

import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let SWIPE_AND_WATCH_ROOMS = {};

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
          [room]: { users: [userId], currentMovie: movies[0].id, votes: {} }, // Inicializamos la room
        };
      } else {
        if (selectedRoom.users.length === 200000) return; //cambiar a 2 de nuevo

        SWIPE_AND_WATCH_ROOMS = {
          ...SWIPE_AND_WATCH_ROOMS,
          [room]: {
            ...selectedRoom,
            users: [...new Set([...selectedRoom.users, userId])],
          },
        };
      }

      socket.join(room);

      io.to(room).emit("room", { movies, room: SWIPE_AND_WATCH_ROOMS[room] });
    });

    socket.on("swipe", ({ room, userId, currentMovieId, vote }) => {
      const currentRoom = SWIPE_AND_WATCH_ROOMS[room];

      if (!currentRoom) return;

      const movieVotes = currentRoom.votes[currentMovieId] || [];

      const existingVoteIndex = movieVotes.findIndex(
        (v) => v.userId === userId
      );

      if (existingVoteIndex > -1) {
        movieVotes[existingVoteIndex].vote = vote;
      } else {
        movieVotes.push({ userId, vote });
      }

      SWIPE_AND_WATCH_ROOMS = {
        ...SWIPE_AND_WATCH_ROOMS,
        [room]: {
          ...currentRoom,
          votes: {
            ...currentRoom.votes,
            [currentMovieId]: movieVotes,
          },
        },
      };

      if (movieVotes.length > 1) {
        const currentMovieIndex = movies.findIndex(
          (movie) => movie.id === currentRoom.currentMovie
        );

        if (currentMovieIndex === -1) return;

        const areAllVotesLikes = movieVotes.every(
          (vote) => vote.vote === "like" || vote.vote === "superlike"
        );

        if (!areAllVotesLikes) {
          SWIPE_AND_WATCH_ROOMS = {
            ...SWIPE_AND_WATCH_ROOMS,
            [room]: {
              ...currentRoom,
              currentMovie: movies[currentMovieIndex + 1].id,
            },
          };
        }
      }
      io.to(room).emit("room", { movies, room: SWIPE_AND_WATCH_ROOMS[room] });
    });

    socket.on("next", ({ room }) => {
      const currentRoom = SWIPE_AND_WATCH_ROOMS[room];

      if (!currentRoom) return;
      const currentMovieIndex = movies.findIndex(
        (movie) => movie.id === currentRoom.currentMovie
      );

      if (currentMovieIndex === -1) return;
      SWIPE_AND_WATCH_ROOMS = {
        ...SWIPE_AND_WATCH_ROOMS,
        [room]: {
          ...currentRoom,
          currentMovie: movies[currentMovieIndex + 1].id,
        },
      };
      io.to(room).emit("room", { movies, room: SWIPE_AND_WATCH_ROOMS[room] });
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

async function fetchMovies() {
  const response = await Promise.all(
    [...Array(5).keys()].map((i) =>
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=86f5f3f73bd8480c9ce28e46c1de3b32&include_adult=false&page=${
          i + 1
        }`
      ).then((res) => res.json())
    )
  );

  const data = response.flatMap((res) => res.results);
  return data;
}
