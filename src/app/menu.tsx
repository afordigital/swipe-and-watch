import { SwipeButtonActions } from "../components/SwipeButtonActions";
import { TinderCardLayout } from "../components/TinderCardLayout";

// Eliminar este comentario, usaremos componentes reutilizables en cada página

export const menu = () => {
  const onSwipeLeft = () => {};
  const onSwipeRight = () => {};
  const onSwipeUp = () => {};
  return (
    <div>
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
};
