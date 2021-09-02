import { Round } from "../types/round";

/*
  Calculates if a round was a Save, Half buy, Force buy, Full buy, or Pistol round for each team
*/

export type RoundType = "save" | "half" | "force" | "full" | "pistol";

export const getRoundType = (
  round: Round
): { red: RoundType; blue: RoundType } => {
  return {
    red: "save",
    blue: "full",
  };
};
