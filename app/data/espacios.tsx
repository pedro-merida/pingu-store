export type Status = "disponible" | "ultimos" | "vendido";
export type Type = "weapon" | "player";

export const espacios: Record<Type, Status> = {
  weapon: "ultimos",
  player: "disponible",
};