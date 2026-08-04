export type Status = "disponible" | "ultimos" | "vendido";
export type Type = "weapon" | "player" | "parachute";

export const espacios: Record<Type, Status> = {
  weapon: "ultimos",
  player: "ultimos",
  parachute: "ultimos",
};