import type { Round } from "../types/round";

/*
  Calculates if a round was a Save, Half buy, Force buy, Full buy, or Pistol round for each team
*/

export type RoundType = "force" | "full" | "half" | "pistol" | "save";

export const getRoundType = (
  round: Round
): { readonly red: RoundType; readonly blue: RoundType } => {
  return {
    blue: "full",
    red: "save",
  };
};
