"use client";
import { Movie, Vote, VOTES } from "./types";
import { CardEvent, CardSwiper } from "react-card-swiper";
import { TinderCardContent } from "./TinderCardContent";
import { Direction } from "@/constants";
import { useEffect } from "react";

type TinderCardLayoutProps = {
  movies: Movie[];
  vote: (vote: Vote) => void;
};

export const TinderCardLayout = ({ movies, vote }: TinderCardLayoutProps) => {
  const handleVote = (mode: Direction) => {
    switch (mode) {
      case "up":
        vote(VOTES.SUPERLIKE);
        break;
      case "left":
        vote(VOTES.DISLIKE);
        break;
      case "right":
        vote(VOTES.LIKE);
        break;
    }
  };

  const mockCurrentMovies = movies.map((movie) => {
    return {
      id: movie.id,
      src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      meta: {},
      content: (
        <TinderCardContent
          currentMovie={movie}
          vote={vote}
          handleVote={handleVote}
        />
      ),
    };
  });

  useEffect(() => {
    console.log(mockCurrentMovies);
  }, [mockCurrentMovies]);

  console.log(mockCurrentMovies);

  const handleDismiss: CardEvent = (el, meta, id, action, operation) => {
    console.log({ el, meta, id, action, operation }); // event data to be handled
  };

  // const handleFinish = (status: string) => {
  //   console.log(status); // 'finished'

  // };

  return (
    <div className="h-full w-[500px] flex flex-col p-2 items-center justify-center">
      <CardSwiper
        data={mockCurrentMovies}
        // onEnter={handleDismiss}
        // onFinish={handleFinish}
        onDismiss={() => {
          console.log("hola");
          handleVote("left");
        }}
        withRibbons
        likeRibbonText="LIKE"
        dislikeRibbonText="DISLIKE"
        ribbonColors={{ bgLike: "green", bgDislike: "red", textColor: "white" }}
        emptyState={
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <p>Waiting...</p>
          </div>
        }
      />
    </div>
  );
};
