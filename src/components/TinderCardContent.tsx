import { CheckCheck, HeartOff, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Movie, Vote } from "./types";
import { Direction } from "@/constants";

type TinderCardContentProps = {
  currentMovie: Movie;
  vote: (vote: Vote) => void;
  handleVote: (mode: Direction) => void;
};

export const TinderCardContent = ({
  currentMovie,
  vote,
  handleVote,
}: TinderCardContentProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="px-6 py-4">
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
            <p className="text-[#64748B]">{currentMovie.vote_count} ratings</p>
          </div>
        </div>
        <CardTitle>{currentMovie.title}</CardTitle>
      </div>
      <CardContent className="">
        <p className="text-[#64748B] select-none">{currentMovie.overview}</p>
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
    </div>
  );
};
