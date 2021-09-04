/* eslint-disable functional/immutable-data */
/*
  Calculates Round Win Share for each player for a given round

  RWS (Round Win Share) is the player's combat score if they won, or 0 if they did not
*/

import type { Player } from "../types/player";
import type { Round } from "../types/round"

export type RWSMap = Record<string, number>;

export const calculateRWS = (round: Round, players: readonly Player[]): RWSMap => {
  const rws: RWSMap = {};

  players.forEach(player => {
    const score = round.playerScores.find(r => r.subject === player.subject)?.score;
    if (score !== undefined) {
      const finalScore = player.teamId === round.winningTeam ? score : 0;
      rws[player.subject] = finalScore;
    }
  });

  return rws;
}
