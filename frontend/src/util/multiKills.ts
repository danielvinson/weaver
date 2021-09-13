import type { Player } from "../types/match";
import type { Round } from "../types/round";

/*
  This while file ended up being a demonstration of how to use
  wrong data structures to make the code way more complicated.
  Should probably refactor this a lot.
*/

export interface MultiKills {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

type PlayerId = string; // for readability

export const calculateRoundMultiKills = (
  round: Round,
  players: readonly Player[]
): Record<PlayerId, MultiKills> => {
  const playerIds = players.map((p) => p.subject);

  const multiKills: Record<PlayerId, MultiKills> = {};
  playerIds.forEach((pid) => {
    if (!(pid in multiKills)) {
      // eslint-disable-next-line functional/immutable-data
      multiKills[pid] = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
    }
    const playerStats = round.playerStats.find((ps) => ps.subject === pid);
    const kills = playerStats?.kills.length;

    if (kills !== undefined) {
      if (kills > 0) {
        // eslint-disable-next-line functional/immutable-data
        multiKills[pid][kills as keyof MultiKills] = 1;
      }
    }
  });

  return multiKills;
};

export const calculateMatchMultikills = (
  players: readonly Player[],
  rounds: readonly Round[]
): Record<PlayerId, MultiKills> => {
  // Writing this fairly verbosely for easier readability
  // NOT optimized for performance at all
  const playerIds = players.map((p) => p.subject);
  const multiKillsArr = rounds.map((round) =>
    calculateRoundMultiKills(round, players)
  );

  const merged: Record<PlayerId, MultiKills> = {};
  playerIds.forEach((pid) => {
    const playerMultiKills = multiKillsArr.map((mk) => mk[pid]);
    // eslint-disable-next-line functional/immutable-data
    merged[pid] = playerMultiKills.reduce<MultiKills>(
      (prev, cur) => {
        return {
          "1": prev[1] + cur[1],
          "2": prev[2] + cur[2],
          "3": prev[3] + cur[3],
          "4": prev[4] + cur[4],
          "5": prev[5] + cur[5],
        };
      },
      {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      }
    );
  });

  return merged;
};
