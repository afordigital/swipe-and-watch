"use client";
import { Footer } from "@/components/Footer";
import { ModeSelection } from "../components/ModeSelection";
import { useState } from "react";

export const MODES = {
  INIT_SCREEN: "init_screen",
  INDIVIDUAL: "individual",
  DUO: "duo",
};

export type Mode = (typeof MODES)[keyof typeof MODES];

export default function Home() {
  const [appMode, setAppMode] = useState<Mode>(MODES.INIT_SCREEN);
  const handleMode = (mode: Mode) => {
    setAppMode(mode);
  };

  return (
    <section className="flex flex-col w-screen items-center justify-center min-h-screen p-8 pb-20 gap-[155px] sm:p-20">
      <h1 className="text-[48px] text-black font-extrabold">
        Choose the modality you prefer
      </h1>
      <article className="flex gap-8">
        <ModeSelection
          handleMode={handleMode}
          // description="Lorem ipsum dolor sit amet consectetur. Risus luctus est eget vulputate velit laoreet aliquet. "
          description="Select this modality if you are searching what to view and want to discover new movies."
          mode={MODES.INDIVIDUAL}
        />
        <ModeSelection
          handleMode={handleMode}
          description="Select this modality if you are searching what to view with someone."
          mode={MODES.DUO}
        />
      </article>
      <Footer />
    </section>
  );
}
