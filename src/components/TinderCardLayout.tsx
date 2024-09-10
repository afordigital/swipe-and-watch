"use client";
import TinderCard from "react-tinder-card";
import { DIRECTION } from "../constants";

type TinderCardLayoutProps = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
};

export const TinderCardLayout = (props: TinderCardLayoutProps) => {
  const onSwipe = (direction: string) => {
    switch (direction) {
      case DIRECTION.LEFT:
        props.onSwipeLeft();
        break;
      case DIRECTION.RIGHT:
        props.onSwipeRight();
        break;
      case DIRECTION.UP:
        props.onSwipeUp();
        break;
    }
  };

  //   const onCardLeftScreen = (myIdentifier: string) => {
  //     console.log(myIdentifier + " left the screen");
  //   };

  return (
    <TinderCard onSwipe={onSwipe} preventSwipe={["down"]}>
      <div className="bg-white w-fit text-black p-10 cursor-drag active:cursor-dragging">
        Hello, World!
      </div>
    </TinderCard>
  );
};
