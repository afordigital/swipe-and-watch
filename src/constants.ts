type Direction = "left" | "right" | "up";

export const DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
} as const satisfies Record<string, Direction>;
