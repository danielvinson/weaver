import type { Player } from "../../types/match";
import type { Round } from "../../types/round";

/*
  Calculates a round type for each team.

  Possible round types:
    Pistol - first round of each half
    Save   - players spent less than {THRESHOLDS.SAVE} on average and had more than {REMAINDER_THRESHOLD} remaining
    Force  - players spent between {THRESHOLDS.SAVE} and {THRESHOLDS.FORCE} on average AND had less than {REMAINDER_THRESHOLD} remaining
    Full   - players spent over {THRESHOLDS.FORCE} on average
*/

const LOADOUT_THRESHOLDS = {
  FORCE: 3700,
  SAVE: 2400,
};

export type RoundType = "force" | "full" | "pistol" | "save";

const calculateTeamEconomy = (
  economies: Round["playerEconomies"]
): [RoundType, number, number] => {
  const averageLoadoutValue =
    economies.reduce((prev, cur) => prev + cur.loadoutValue, 0) / 5;
  const averageSpend = economies.reduce((prev, cur) => prev + cur.spent, 0) / 5;

  if (averageLoadoutValue <= LOADOUT_THRESHOLDS.SAVE) {
    return ["save", averageLoadoutValue, averageSpend];
  }

  if (averageLoadoutValue <= LOADOUT_THRESHOLDS.FORCE) {
    return ["force", averageLoadoutValue, averageSpend];
  }

  return ["full", averageLoadoutValue, averageSpend];
};

interface RoundTypeInfo {
  readonly red: RoundType;
  readonly blue: RoundType;
  readonly blueLoadoutValue: number;
  readonly redLoadoutValue: number;
  readonly blueSpend: number;
  readonly redSpend: number;
}

export const getRoundType = (
  round: Round,
  players: readonly Player[]
): RoundTypeInfo => {
  const redTeamPlayerIds = players
    .filter((p) => p.teamId === "Red")
    .map((p) => p.subject);
  const blueTeamPlayerIds = players
    .filter((p) => p.teamId === "Blue")
    .map((p) => p.subject);

  const redEconomies = round.playerEconomies.filter((pe) =>
    redTeamPlayerIds.includes(pe.subject)
  );
  const blueEconomies = round.playerEconomies.filter((pe) =>
    blueTeamPlayerIds.includes(pe.subject)
  );

  const blueTeamEconomy = calculateTeamEconomy(blueEconomies);
  const redTeamEconomy = calculateTeamEconomy(redEconomies);

  if (round.roundNum === 0 || round.roundNum === 13) {
    return {
      blue: "pistol",
      blueLoadoutValue: blueTeamEconomy[1],
      blueSpend: blueTeamEconomy[2],
      red: "pistol",
      redLoadoutValue: redTeamEconomy[1],
      redSpend: redTeamEconomy[2],
    };
  }

  return {
    blue: blueTeamEconomy[0],
    blueLoadoutValue: blueTeamEconomy[1],
    blueSpend: blueTeamEconomy[2],
    red: redTeamEconomy[0],
    redLoadoutValue: redTeamEconomy[1],
    redSpend: redTeamEconomy[2],
  };
};
