export type Direction = "left" | "right" | "up" | "down";

export const DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
} as const satisfies Record<string, Direction>;
