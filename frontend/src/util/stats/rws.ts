/* eslint-disable functional/immutable-data */
/*
  Calculates Round Win Share for each player for a given round

  RWS (Round Win Share) is the player's combat score if they won, or 0 if they did not
*/

import { getRoundType } from "./roundType";
import type { Player } from "../../types/match";
import type { Round } from "../../types/round";

const WEIGHTS = {
  force: 0.8,
  full: 1.3,
  pistol: 1.3,
  save: 0.6,
};

export type RWSMap = Record<string, number>;

export const calculateRWS = (
  round: Round,
  players: readonly Player[]
): RWSMap => {
  const rws: RWSMap = {};

  players.forEach((player) => {
    try {
      const score = round.playerScores.find(
        (r) => r.subject === player.subject
      )?.score;

      if (score !== undefined) {
        const finalScore = player.teamId === round.winningTeam ? score : 0;
        rws[player.subject] = finalScore;
      }
    } catch (e: unknown) {
      console.error(`playerScores missing for round ${round.roundNum}`);
    }
  });

  return rws;
};

export const calculateWeightedRWS = (
  round: Round,
  players: readonly Player[]
): RWSMap => {
  const rws: RWSMap = {};
  players.forEach((player) => {
    try {
      const score = round.playerScores.find(
        (r) => r.subject === player.subject
      )?.score;
      if (score === undefined) {
        return; // not possible
      }

      if (player.teamId !== round.winningTeam) {
        return 0;
      }

      const enemyBuyType = getRoundType(round, players)[
        player.teamId === "Blue" ? "red" : "blue"
      ];
      rws[player.subject] = score * WEIGHTS[enemyBuyType];
    } catch (e: unknown) {
      console.error(`playerScores missing for round ${round.roundNum}`);
    }
  });

  return rws;
};
