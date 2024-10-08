"use client";
import TinderCard from "react-tinder-card";
import { Star, HeartOff, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie, Vote, VOTES } from "./types";
import { Direction } from "@/constants";

type TinderCardLayoutProps = {
  currentMovie: Movie;
  vote: (vote: Vote) => void;
};

export const TinderCardLayout = ({
  currentMovie,
  vote,
}: TinderCardLayoutProps) => {
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

  return (
    <TinderCard onSwipe={(mode) => handleVote(mode)} preventSwipe={["down"]}>
      <div className="cursor-grab active:cursor-grabbing text-[14px]">
        <Card className="w-full max-w-md ">
          <CardHeader>
            <div className="relative w-full h-48 mb-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                alt={`movie ${currentMovie.title} image`}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="flex justify-between items-center">
              <Badge className="h-[24px] rounded-full px-6">
                {currentMovie.genre_ids}
              </Badge>
              <div className="flex flex-col items-center">
                <p className="font-semibold">
                  <span className="text-[20px]">
                    {currentMovie.vote_average.toFixed(1)}
                  </span>{" "}
                  / 10
                </p>
                <p className="text-[#64748B]">
                  {currentMovie.vote_count} ratings
                </p>
              </div>
            </div>
            <CardTitle>{currentMovie.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B] select-none">
              {currentMovie.overview}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-[40px] h-[40px] bg-[#EF4444] hover:bg-[#f95252] text-white"
              onClick={() => {
                handleVote("left");
              }}
            >
              <HeartOff size={16} />
              <span className="sr-only">Not Interested</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-[40px] h-[40px] text-white bg-gradient-to-b from-[#64CE99] to-[#50A1CF]"
              onClick={() => {
                handleVote("up");
              }}
            >
              <Star size={16} />
              <span className="sr-only">Add to Favorites</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-[40px] h-[40px] text-white bg-[#487BFE]"
              onClick={() => {
                handleVote("right");
              }}
            >
              <CheckCheck size={16} />
              <span className="sr-only">Interested</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TinderCard>
  );
};
