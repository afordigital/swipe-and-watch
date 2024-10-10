"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { TinderCardLayout } from "@/components/TinderCardLayout";
import { Movie, Room, VOTES } from "@/components/types";
import { Footer } from "@/components/Footer";

const page = ({ params }: { params: { room: string } }) => {
  const roomId = params.room;
  const userId = crypto.randomUUID();

  const [room, setRoom] = useState<Room | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const isLoading = room === null;

  const currentMovieId = room?.currentMovie;
  const currentMovie = movies.find((movie) => movie.id === currentMovieId);
  const status = getStatus(room, userId);

  useEffect(() => {
    socket.connect().emit("join", { room: roomId, userId });

    return () => {
      socket.disconnect().emit("leave", { room: roomId, userId });
    };
  }, []);

  useEffect(() => {
    socket.on("init", (data) => {
      setRoom(data.room);
      setMovies(data.movies);
    });

    socket.on("pitopocho", (data) => {
      console.log("pitopocho: ", data);
    });

    return () => {
      socket.off("init");
    };
  }, []);

  const vote = (vote: string) => {
    socket.emit("swipe", { room: roomId, userId, currentMovieId, vote });
  };

  console.log(status);

  return (
    <main className="bg-red-300 h-screen w-full">
      {isLoading && <p>Loading...</p>}
      {status === "WAITING" && <p>Waiting to the other person to vote...</p>}
      {!isLoading && currentMovie && status === "VOTING" && (
        <div className="flex flex-col h-full p-5 justify-center items-center">
          <h1 className="text-[48px] font-extrabold">
            Find the best movie match
          </h1>
          <article className="flex flex-1 items-center justify-center h-full">
            <TinderCardLayout movies={movies} vote={vote} />
          </article>
          <Footer />
        </div>
      )}
    </main>
  );
};

export default page;

type RoomStatus =
  | "VOTING"
  | "WAITING"
  | "MATCHED"
  | "SUPERMATCHED"
  | "FINISHED";

const getStatus = (room: Room | null, currentUserId: string): RoomStatus => {
  if (!room) return "WAITING";
  const votes = room.votes[room.currentMovie];
  if (!votes) return "VOTING";
  if (votes.length === 0) return "VOTING";
  if (votes.length === 1) {
    const vote = votes[0];
    if (vote.userId === currentUserId) return "WAITING";
    return "VOTING";
  }
  if (votes.length === 2) {
    const [firstVote, secondVote] = votes;

    if (firstVote.vote === secondVote.vote) {
      if (
        firstVote.vote === VOTES.DISLIKE &&
        secondVote.vote === VOTES.DISLIKE
      ) {
        socket.emit("next", { room: room });
        return "VOTING";
        //llamar a next
      }
      if ((firstVote.vote || secondVote.vote) === VOTES.SUPERLIKE)
        return "SUPERMATCHED";
      return "MATCHED";
    }
    return "VOTING";
  }
  return "WAITING";
};
