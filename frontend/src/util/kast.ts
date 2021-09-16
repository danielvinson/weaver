/* eslint-disable functional/immutable-data */
import type { Player } from "../types/match";
import type { Round } from "../types/round";

const TRADE_THRESHOLD_MS = 3000;

type KastType = "assist" | "kill" | "survive" | "trade";
type KastData = Record<string, (KastType | null)[]>;
type KastPercents = Record<string, number>;

// API doesn't currently give data for non-damaging assists

export const calculateRoundKast = (
  round: Round,
  player: Player
): KastType | null => {
  // Returns true if the player got a Kill or Assist, Survived, or was Traded.
  const roundPlayerStats = round.playerStats.find(
    (ps) => ps.subject === player.subject
  );
  const playersDamaged = roundPlayerStats?.damage
    .filter((d) => d.damage > 50)
    .map((d) => d.receiver);
  const allKills = round.playerStats.flatMap((ps) => ps.kills);
  const playerDeath = allKills.find((k) => k.victim === player.subject);

  if (!roundPlayerStats) {
    // Not possible
    return null;
  }

  // Kills
  if (roundPlayerStats.kills.length > 0) {
    return "kill";
  }

  // Assist
  if (allKills.filter((k) => playersDamaged?.includes(k.victim)).length > 0) {
    return "assist";
  }

  // Survived
  if (playerDeath === undefined) {
    return "survive";
  }

  // Trade
  const deathTime = playerDeath.gameTime;
  const killsWithinThresh = allKills.filter(
    (k) =>
      k.gameTime - deathTime > 0 && k.gameTime - deathTime < TRADE_THRESHOLD_MS
  );

  if (
    killsWithinThresh.filter((k) => k.victim === playerDeath.killer).length > 0
  ) {
    return "trade";
  }

  return null;
};

export const calculateKastData = (
  rounds: readonly Round[],
  players: readonly Player[]
): KastData => {
  const kastData: KastData = {};
  rounds.forEach((round) => {
    players.forEach((player) => {
      const kast = calculateRoundKast(round, player);
      if (!(player.subject in kastData)) {
        kastData[player.subject] = [kast];
      } else {
        kastData[player.subject].push(kast);
      }
    });
  });

  return kastData;
};

export const calculateKastPercents = (
  rounds: readonly Round[],
  players: readonly Player[]
): KastPercents => {
  const kastPercents: KastPercents = {};
  Object.entries(calculateKastData(rounds, players)).forEach(
    ([playerId, values]) => {
      const kastRounds = values.filter((v) => v !== null).length;
      kastPercents[playerId] = (kastRounds / values.length) * 100;
    }
  );

  return kastPercents;
};

export const calculateKastNumbers = (
  rounds: readonly Round[],
  players: readonly Player[]
): Record<string, Record<KastType, number>> => {
  const kastNumbers: Record<string, Record<KastType, number>> = {};
  Object.entries(calculateKastData(rounds, players)).forEach(
    ([playerId, values]) => {
      const assists = values.filter((v) => v === "assist").length;
      const kills = values.filter((v) => v === "kill").length;
      const trades = values.filter((v) => v === "trade").length;
      const survived = values.filter((v) => v === "survive").length;
      if (!(playerId in kastNumbers)) {
        kastNumbers[playerId] = {
          assist: 0,
          kill: 0,
          survive: 0,
          trade: 0,
        };
      }

      kastNumbers[playerId].assist += assists;
      kastNumbers[playerId].kill += kills;
      kastNumbers[playerId].trade += trades;
      kastNumbers[playerId].survive += survived;
    }
  );

  return kastNumbers;
};
