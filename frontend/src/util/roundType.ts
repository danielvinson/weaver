import type { Player } from "../types/match";
import type { Round } from "../types/round";

/*
  Calculates a round type for each team.

  Possible round types:
    Pistol - first round of each half
    Save   - players spent less than {THRESHOLDS.SAVE} on average
    Force  - players spent between {THRESHOLDS.SAVE} and {THRESHOLDS.FORCE} on average
    Full   - players spent over {THRESHOLDS.FORCE} on average
*/

const THRESHOLDS = {
  FORCE: 3500,
  SAVE: 1200,
};

export type RoundType = "force" | "full" | "pistol" | "save";

const calculateTeamEconomy = (
  economies: Round["playerEconomies"]
): RoundType => {
  const averageSpend = economies.reduce((prev, cur) => prev + cur.spent, 0);
  if (averageSpend <= THRESHOLDS.SAVE) {
    return "save";
  }

  if (averageSpend <= THRESHOLDS.FORCE) {
    return "force";
  }

  return "full";
};

export const getRoundType = (
  round: Round,
  players: readonly Player[]
): { readonly red: RoundType; readonly blue: RoundType } => {
  // Check for pistol round
  if (round.roundNum === 0 || round.roundNum === 13) {
    return {
      blue: "pistol",
      red: "pistol",
    };
  }

  const redTeamPlayers = players.filter((p) => p.teamId === "Red");
  const blueTeamPlayers = players.filter((p) => p.teamId === "Blue");
  const redEconomies = round.playerEconomies.filter(
    (pe) => pe.subject in redTeamPlayers
  );
  const blueEconomies = round.playerEconomies.filter(
    (pe) => pe.subject in blueTeamPlayers
  );

  return {
    blue: calculateTeamEconomy(blueEconomies),
    red: calculateTeamEconomy(redEconomies),
  };
};
