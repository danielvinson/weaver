import { PlayerKills, Round } from "../types/round";

export const makeRoundTimeline = (round: Round): PlayerKills[] => {
  return round.playerStats
    .flatMap((stats) => stats.kills)
    .sort((a, b) => a.roundTime - b.roundTime);
};
