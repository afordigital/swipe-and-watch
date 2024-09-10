"use client";

import { useEffect } from "react";
import { socket } from "@/socket";
import { TinderCardLayout } from "@/components/TinderCardLayout";

const page = ({ params }: { params: { room: string } }) => {
  const room = params.room;
  const userId = crypto.randomUUID();

  useEffect(() => {
    socket.connect().emit("join", { room, userId });

    return () => {
      socket.disconnect().emit("leave", { room, userId });
    };
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
      {!socket ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Hola, estás en la sala {params.room}</h1>
          <TinderCardLayout
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            onSwipeUp={onSwipeUp}
          />
        </>
      )}
    </>
  );
};

export default page;
