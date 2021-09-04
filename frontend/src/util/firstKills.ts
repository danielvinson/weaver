/* eslint-disable functional/immutable-data */
import { makeRoundTimeline } from "./roundTimeline";
import type { Player } from "../types/player";
import type { Round } from "../types/round";

export const calculateFirstKills = (players: readonly Player[], rounds: readonly Round[]) => {
  const firstKills: Record<Player["subject"], number> = {};

  players.forEach((player) => {
    firstKills[player.subject] = 0;
  });

  rounds.forEach((round) => {
    const timeline = makeRoundTimeline(round);
    if (timeline.length > 0) {
      firstKills[timeline[0].killer] += 1;
    }
  });

  return firstKills;
};
