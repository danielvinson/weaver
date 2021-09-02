/*
  Calculates Round Win Share for each player for a given round

  RWS (Round Win Share) is the player's combat score if they won, or 0 if they did not
*/

import { Player } from "../types/player";
import { Round } from "../types/round"

export interface RWSMap {
  [playerId: string]: number;
}

export const getRWS = (round: Round, players: Player[]): RWSMap => {
  let rws: RWSMap = {};

  players.map(player => {
    const score = round.playerScores.find(r => r.subject === player.subject)?.score;
    if (score !== undefined) {
      const finalScore = player.teamId === round.winningTeam ? score : 0;
      rws[player.subject] = finalScore;
    }
  });

  return rws;
}
