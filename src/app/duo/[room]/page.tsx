"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { TinderCardLayout } from "@/components/TinderCardLayout";
import fetchMovies from "@/api/moviesApi";

const page = ({ params }: { params: { room: string } }) => {
  // const { data, isLoading, error } = fetchMovies();

  const room = params.room;
  const userId = crypto.randomUUID();
  // const [currentMovieId, setCurrentMovieId] = useState(0);
  // const currentMovie = data ? data[currentMovieId] : {};

  useEffect(() => {
    socket.connect().emit("join", { room, userId });

    return () => {
      socket.disconnect().emit("leave", { room, userId });
    };
  }, []);

  useEffect(() => {
    socket.on("room", (data) => {
      console.log(data);
    });
  }, []);

  const onSwipeLeft = () => {
    socket.emit("swipe", { room, userId, direction: "left" });
  };
  const onSwipeRight = () => {
    socket.emit("swipe", { room, userId, direction: "right" });
  };
  const onSwipeUp = () => {
    socket.emit("swipe", { room, userId, direction: "up" });
  };

  return (
    <>
      HOla
      {/* {!socket || (isLoading && <p>Loading...</p>)}
      {error && <p>Errores...</p>}
      {socket && (
        <>
          <h1>Hola, estás en la sala {params.room}</h1>
          <main className="flex items-center justify-center h-screen">
            <TinderCardLayout
              movies={data}
              currentMovie={currentMovie}
              onSwipeLeft={onSwipeLeft}
              onSwipeRight={onSwipeRight}
              onSwipeUp={onSwipeUp}
            />
          </main>
        </>
      )} */}
    </>
  );
};

export default page;
