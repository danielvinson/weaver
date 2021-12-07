/* eslint-disable functional/immutable-data */
import type { PlayerKills, Round } from "../../types/round";

export const makeRoundTimeline = (round: Round): readonly PlayerKills[] => {
  return round.playerStats
    .flatMap((stats) => stats.kills)
    .sort((a, b) => a.roundTime - b.roundTime);
};
