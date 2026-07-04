export type Status = "disponible" | "ultimos" | "vendido";
export type Type = "weapon" | "player" | "parachute";

export const espacios: Record<Type, Status> = {
  weapon: "disponible",
  player: "disponible",
  parachute: "disponible",
};