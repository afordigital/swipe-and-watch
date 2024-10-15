"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { TinderCardLayout } from "@/components/TinderCardLayout";
import { Movie, Room, VOTES } from "@/components/types";
import { Footer } from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowUpRight } from "lucide-react";
import JSConfetti from "js-confetti";

const userId = crypto.randomUUID();
const jsConfetti = new JSConfetti();

const page = ({ params }: { params: { room: string } }) => {
  const roomId = params.room;

  const [room, setRoom] = useState<Room | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const isLoading = room === null;

  const currentMovieId = room?.currentMovie;
  const currentMovie = movies.find((movie) => movie.id === currentMovieId);
  const status = getStatus(room, userId);

  useEffect(() => {
    if (status === "MATCHED" || status === "SUPERMATCHED") {
      jsConfetti.addConfetti({
        emojis: ["🎉", "🎊"],
      });
    }
  }, [status]);

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
    socket.emit("swipe", { room: roomId, userId, currentMovieId, vote });
  };

  console.log(status);

  const nextMovie = () => {
    socket.emit("next", { room: roomId });
  };

  return (
    <main className="text-black">
      <section className="flex flex-col w-screen h-screen items-center justify-center p-8 pb-20 gap-[44px] sm:p-20">
        <h1 className="text-[48px] font-extrabold">
          Find the best movie match
        </h1>
        {isLoading && <p>Loading...</p>}
        {status === "WAITING" && <p>Waiting to the other person to vote...</p>}
        {!isLoading &&
          currentMovie &&
          (status === "VOTING" ||
            status === "MATCHED" ||
            status === "SUPERMATCHED") && (
            <>
              {(status === "MATCHED" || status === "SUPERMATCHED") && (
                <Dialog defaultOpen>
                  <DialogContent className="max-w-[425px] flex flex-col gap- bg-white p-4">
                    <DialogHeader>
                      <DialogTitle className="text-[#0F172A] text-[20px]">
                        ¡Congratulations, It's a match!
                      </DialogTitle>
                      <DialogDescription className="text-[#64748b] text-[14px]">
                        Lorem ipsum dolor sit amet consectetur. Placerat nibh
                        egestas sagittis mattis scelerisque dictum nullam. Nulla
                        enim ut volutpat pellentesque.
                      </DialogDescription>
                    </DialogHeader>

                    <a
                      href="https://github.com/Afordin"
                      className="flex items-center gap-1 underline underline-offset-2 text-[#48586F]"
                    >
                      Ver trailer de lorem ipsum dolor
                      <ArrowUpRight size={16} />
                    </a>

                    <DialogFooter className="w-full flex flex-row">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button onClick={nextMovie}>Continue searching</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <article className="flex-1 h-full flex items-center justify-center">
                <TinderCardLayout movie={currentMovie} vote={vote} />
              </article>
              <Footer />
            </>
          )}
      </section>
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

    if (
      firstVote.vote === VOTES.SUPERLIKE ||
      secondVote.vote === VOTES.SUPERLIKE
    ) {
      return "SUPERMATCHED";
    }

    if (firstVote.vote === secondVote.vote) {
      if (
        firstVote.vote === VOTES.DISLIKE &&
        secondVote.vote === VOTES.DISLIKE
      ) {
        return "WAITING";
      }
      return "MATCHED";
    }

    return "VOTING";
  }

  return "WAITING";
};
