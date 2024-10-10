"use client";
import { Movie, Vote, VOTES } from "./types";
import { CardEnterEvent, CardEvent, CardSwiper } from "react-card-swiper";
import { TinderCardContent } from "./TinderCardContent";
import { Direction } from "@/constants";

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

  const handleDismiss: CardEvent = (el, meta, id, action, operation) => {
    console.log({ el, meta, id, action, operation }); // event data to be handled
  };

  const handleFinish = (status: string) => {
    console.log(status); // 'finished'
  };

  const handleEnter: CardEnterEvent = (el, meta, id) => {
    console.log(meta, id);
  };

  return (
    <div className="h-full w-[500px] flex flex-col p-2 items-center justify-center">
      <CardSwiper
        data={mockCurrentMovies}
        // onEnter={handleEnter}
        onFinish={handleFinish}
        onDismiss={() => handleVote("left")}
        // dislikeButton={<div>Left</div>}
        // likeButton={<div>Right</div>}
        // withActionButtons
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
