/* eslint-disable functional/immutable-data */
import type { Match, Player } from "../types/match";

/* 
  Trying out a few stats here -
    1. Percent of kills which involved a headshot
    2. Percent of bullets which hit which were headshots
    3. Percent of bullets which hit players you killed which were headshots
*/

const calculateKillHeadshotPercent = (player: Player, match: Match) => {
  const headshotKillsByRound = match.roundResults.map((round) => {
    const stats = round.playerStats.find((ps) => ps.subject === player.subject);
    if (stats === undefined) {
      return 0;
    }

    const headshotKills = stats.kills
      .map((k) => k.victim)
      .map((victim) => {
        const killStats = stats.damage.find((d) => d.receiver === victim);
        if (killStats === undefined) {
          return 0;
        }
        if (killStats.headshots > 0) {
          return 1;
        }

        return 0;
      });

    return headshotKills.filter(k => k === 1).length;
  });

  const totalHSKills = headshotKillsByRound.reduce(
    (prev, cur) => prev + cur,
    0
  );

  console.log(player.subject, totalHSKills);

  return (
    headshotKillsByRound.reduce((prev, cur) => prev + cur, 0) /
    headshotKillsByRound.length
  );
};

const calculateBulletHeadshotPercent = (player: Player, match: Match) => {
  const roundHeadshotPercents = match.roundResults.map((round) => {
    const stats = round.playerStats.find((ps) => ps.subject === player.subject);
    if (stats === undefined) {
      return 0;
    }

    const bodyshots = stats.damage
      .map((d) => d.bodyshots)
      .reduce((prev, cur) => prev + cur, 0);
    const legshots = stats.damage
      .map((d) => d.legshots)
      .reduce((prev, cur) => prev + cur, 0);
    const headshots = stats.damage
      .map((d) => d.headshots)
      .reduce((prev, cur) => prev + cur, 0);

    const totalHits = bodyshots + legshots + headshots;
    if (totalHits === 0) {
      return 0;
    }

    return headshots / totalHits;
  });

  const numberOfRounds = roundHeadshotPercents.length;
  const totalHeadshots = roundHeadshotPercents.reduce(
    (prev, cur) => prev + cur,
    0
  );

  return totalHeadshots / numberOfRounds;
};

export const calculateHeadshotData = (match: Match) => {
  const res: Record<string, { bullet: number; kill: number }> = {};
  match.players.forEach((player) => {
    res[player.subject] = {
      bullet: calculateBulletHeadshotPercent(player, match),
      kill: calculateKillHeadshotPercent(player, match),
    };
  });

  return res;
};
