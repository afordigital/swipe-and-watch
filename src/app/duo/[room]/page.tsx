"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { TinderCardLayout } from "@/components/TinderCardLayout";
import { Movie, Room, VOTES } from "@/components/types";

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
    socket.on("room", (data) => {
      setRoom(data.room);
      setMovies(data.movies);
    });

    return () => {
      socket.off("room");
    };
  }, []);

  const vote = (vote: string) => {
    console.log(vote);
    socket.emit("swipe", { room: roomId, userId, currentMovieId, vote });
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && currentMovie && (
        <>
          <h1>Hola, estás en la sala {params.room}</h1>
          <main className="flex items-center justify-center h-screen">
            <TinderCardLayout
              movies={movies}
              currentMovie={currentMovie}
              onSwipeLeft={() => {
                vote(VOTES.DISLIKE);
              }}
              onSwipeRight={() => {
                vote(VOTES.LIKE);
              }}
              onSwipeUp={() => {
                vote(VOTES.SUPERLIKE);
              }}
            />
          </main>
        </>
      )}
    </>
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
  if (!votes) return "WAITING";
  if (votes.length === 0) return "VOTING";
  if (votes.length === 1) {
    const vote = votes[0];
    if (vote.userId === currentUserId) return "WAITING";
    return "VOTING";
  }
  if (votes.length === 2) {
    const [firstVote, secondVote] = votes;

    if (firstVote.vote === secondVote.vote) {
      if ((firstVote.vote || secondVote.vote) === VOTES.SUPERLIKE)
        return "SUPERMATCHED";
      return "MATCHED";
    }
    return "VOTING";
  }
  return "WAITING";
};
