import type { Match } from "../../types/match";
import type { Round } from "../../types/round";

interface TeamStartingSides {
  readonly red: "attack" | "defense" | "unknown";
  readonly blue: "attack" | "defense" | "unknown";
}

export const filterByHalf = (
  roundResults: readonly Round[],
  half: 1 | 2
): readonly Round[] => {
  const firstHalf = roundResults.filter((r) => r.roundNum < 12);
  const secondHalf = roundResults.filter((r) => r.roundNum >= 12);
  return half === 1 ? firstHalf : secondHalf;
};

// Infer from data which team started on which side
export const inferSides = (match: Match): TeamStartingSides => {
  // check if there were any bomb plants in the first half
  const firstHalf = filterByHalf(match.roundResults, 1);
  const firstHalfPlant = firstHalf.find((rr) => rr.bombPlanter !== null);
  if (firstHalfPlant !== undefined) {
    const player = match.players.find(
      (p) => p.subject === firstHalfPlant.bombPlanter
    );
    if (player?.teamId === "Red") {
      return {
        blue: "defense",
        red: "attack",
      };
    }
    return {
      blue: "attack",
      red: "defense",
    };
  }

  // check if there were any bomb plants in the second half
  const secondHalf = filterByHalf(match.roundResults, 1);
  const secondHalfPlant = secondHalf.find((rr) => rr.bombPlanter !== null);
  if (secondHalfPlant !== undefined) {
    const player = match.players.find(
      (p) => p.subject === secondHalfPlant.bombPlanter
    );
    if (player?.teamId === "Red") {
      return {
        blue: "attack",
        red: "defense",
      };
    }
    return {
      blue: "defense",
      red: "attack",
    };
  }

  return {
    blue: "unknown",
    red: "unknown",
  };
};
