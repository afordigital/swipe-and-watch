"use client";
import TinderCard from "react-tinder-card";
import { DIRECTION } from "../constants";
import { ThumbsDown, ThumbsUp, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Movie } from "./types";

type TinderCardLayoutProps = {
  movies: Movie[];
  currentMovie: number;
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

  return (
    <TinderCard onSwipe={onSwipe} preventSwipe={["down"]}>
      <div className="cursor-grab active:cursor-grabbing">
        <Card className="w-full max-w-md ">
          <CardHeader>
            <div className="relative w-full h-48 mb-4">
              <img
                src="/placeholder.svg?height=192&width=384"
                alt="Movie poster"
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Inception
              </CardTitle>
              <CardDescription className="text-gray-400">
                2010 • Action, Sci-Fi • 2h 28min
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              A thief who enters the dreams of others to steal secrets from
              their subconscious is offered a chance to regain his old life as
              payment for a task considered to be impossible: "inception", the
              implantation of another person's idea into a target's
              subconscious.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-900 text-blue-200">
                Netflix
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-900 text-green-200"
              >
                Amazon Prime
              </Badge>
              <Badge variant="secondary" className="bg-red-900 text-red-200">
                HBO Max
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span>8.8/10 IMDb</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-red-900 hover:bg-red-800 text-red-400 border-red-700"
            >
              <ThumbsDown className="h-6 w-6" />
              <span className="sr-only">Not Interested</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-yellow-900 hover:bg-yellow-800 text-yellow-400 border-yellow-700"
            >
              <Star className="h-6 w-6" />
              <span className="sr-only">Add to Favorites</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-green-900 hover:bg-green-800 text-green-400 border-green-700"
            >
              <ThumbsUp className="h-6 w-6" />
              <span className="sr-only">Interested</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TinderCard>
  );
};
