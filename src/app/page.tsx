"use client";
import { SwipeButtonActions } from "./components/SwipeButtonActions";
import { TinderCardLayout } from "./components/TinderCardLayout";

export default function Home() {
  const onSwipeLeft = () => {};
  const onSwipeRight = () => {};
  const onSwipeUp = () => {};

  return (
    <div className="flex flex-col w-screen items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TinderCardLayout
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeUp={onSwipeUp}
      />
      <SwipeButtonActions
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeUp={onSwipeUp}
      />
    </div>
  );
}
