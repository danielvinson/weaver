/* eslint-disable functional/immutable-data */
import { makeRoundTimeline } from "./roundTimeline";
import type { Player } from "../types/match";
import type { Round } from "../types/round";

export const calculateFirstDeaths= (players: readonly Player[], rounds: readonly Round[]) => {
  const firstDeaths: Record<Player["subject"], number> = {};

  players.forEach((player) => {
    firstDeaths[player.subject] = 0;
  });

  rounds.forEach((round) => {
    const timeline = makeRoundTimeline(round);

    if (timeline.length > 0) {
      firstDeaths[timeline[0].victim] += 1;
    }
  });

  return firstDeaths;
};
