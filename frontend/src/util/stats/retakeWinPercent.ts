/* eslint-disable functional/immutable-data */
import type { Match, Player } from "../../types/match";
import type { Round } from "../../types/round";

type PlantSite = "" | "A" | "B" | "C";

interface RetakeAttempt {
  Red: number;
  Blue: number;
  success: boolean;
}

type RetakeWins = Record<
  "Blue" | "Red",
  Record<
    "A" | "B" | "C",
    {
      attempts: RetakeAttempt[];
      successes: number;
    }
  >
>;

export const calcPlayersAliveAtRoundTime = (
  round: Round,
  players: readonly Player[],
  roundTime: number
) => {
  const playersWithoutSpectators = players.filter((p) => p.stats !== null);
  const kills = round.playerStats.flatMap((ps) => ps.kills);
  const killsBeforeRoundTime = kills.filter((k) => k.roundTime < roundTime);
  const deadPlayersBeforeRoundTime = killsBeforeRoundTime.map((k) => k.victim);
  const blueTeamAlive = playersWithoutSpectators
    .filter((player) => player.teamId === "Blue")
    .filter((player) => deadPlayersBeforeRoundTime.includes(player.subject));
  const redTeamAlive = playersWithoutSpectators
    .filter((player) => player.teamId === "Red")
    .filter((player) => deadPlayersBeforeRoundTime.includes(player.subject));

  return {
    Blue: blueTeamAlive.length,
    Red: redTeamAlive.length,
  };
};

export const calcRetakeWins = (match: Match): RetakeWins => {
  const results: RetakeWins = {
    Blue: {
      A: {
        attempts: [],
        successes: 0,
      },
      B: {
        attempts: [],
        successes: 0,
      },
      C: {
        attempts: [],
        successes: 0,
      },
    },
    Red: {
      A: {
        attempts: [],
        successes: 0,
      },
      B: {
        attempts: [],
        successes: 0,
      },
      C: {
        attempts: [],
        successes: 0,
      },
    },
  };

  match.roundResults.forEach((round) => {
    const plantSite = round.plantSite as PlantSite;

    if (plantSite !== "") {
      const planter = match.players.find(
        (p) => p.subject === round.bombPlanter
      );

      if (!planter) {
        throw new Error(`couldn't find bomb planter ${round.bombPlanter}`);
      }

      const plantTeam = planter.teamId;
      const defuseTeam = plantTeam === "Blue" ? "Red" : "Blue";
      const playersAlive = calcPlayersAliveAtRoundTime(
        round,
        match.players,
        round.plantRoundTime
      );

      if (playersAlive.Blue === 0 || playersAlive.Red === 0) {
        // Plant after round end
        return;
      }

      if (round.bombDefuser !== undefined) {
        // Successful Retake
        results[defuseTeam][plantSite].successes += 1;
        results[defuseTeam][plantSite].attempts.push({
          ...playersAlive,
          success: true,
        });
      } else {
        // Failed Retake
        results[defuseTeam][plantSite].attempts.push({
          ...playersAlive,
          success: false,
        });
      }
    }
  });

  return results;
};
