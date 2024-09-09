"use client";

type SwipeButtonActionsProps = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
};

const buttonStyle = "bg-green-500 py-2 px-4 hover:bg-green-600";

export const SwipeButtonActions = (props: SwipeButtonActionsProps) => {
  return (
    <div className="flex gap-4">
      <button className={buttonStyle} onClick={props.onSwipeLeft}>
        Like
      </button>
      <button className={buttonStyle} onClick={props.onSwipeRight}>
        Superlike
      </button>
      <button className={buttonStyle} onClick={props.onSwipeUp}>
        Dislike
      </button>
    </div>
  );
};
