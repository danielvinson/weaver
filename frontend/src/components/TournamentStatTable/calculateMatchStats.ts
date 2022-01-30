/* eslint-disable functional/immutable-data */
import { calculateAgentPerformance } from "../../util/stats/agentPerformance";
import { calculateClutches } from "../../util/stats/clutches";
import { calculateFirstDeaths } from "../../util/stats/firstDeaths";
import { calculateFirstKills } from "../../util/stats/firstKills";
import { calculateHeadshotData } from "../../util/stats/headshot";
import { calculateKastPercents } from "../../util/stats/kast";
import { calculateMatchMultikills } from "../../util/stats/multiKills";
import { calculateRWS, calculateWeightedRWS } from "../../util/stats/rws";
import type { Match, NonSpectatorPlayer } from "../../types/match";
import type { PlayerData } from "./types";

export const calculateMatchStats = (match: Match): PlayerData[] => {
  const clutches = calculateClutches(match.players, match.roundResults);
  const firstKills = calculateFirstKills(match.players, match.roundResults);
  const firstDeaths = calculateFirstDeaths(match.players, match.roundResults);
  const headshotPercents = calculateHeadshotData(match);
  const multiKills = calculateMatchMultikills(
    match.players,
    match.roundResults
  );
  const kastPercents = calculateKastPercents(match.roundResults, match.players);

  const rwsData: Record<string, number> = {};
  const wrwsData: Record<string, number> = {};
  match.roundResults.forEach((round) => {
    const rws = calculateRWS(round, match.players);
    const wrws = calculateWeightedRWS(round, match.players);

    Object.entries(rws).forEach(([key, val]) => {
      if (!(key in rwsData)) {
        rwsData[key] = val;
      }
      rwsData[key] += val;
    });

    Object.entries(wrws).forEach(([key, val]) => {
      if (!(key in wrwsData)) {
        wrwsData[key] = val;
      }
      wrwsData[key] += val;
    });
  });

  const playersNoSpectators = match.players
    .filter((player) => player.stats !== null)
    .map((player) => {
      return player as NonSpectatorPlayer;
    });

  console.log(playersNoSpectators);

  const matchData = playersNoSpectators.map((player) => {
    const teamRoundsWon = match.roundResults.filter(
      (r) => r.winningTeam === player.teamId
    ).length;

    return {
      agent: player.characterId,
      agentWeightedAcs: calculateAgentPerformance(
        player,
        player.stats.score / player.stats.roundsPlayed
      ),
      agentWeightedWrwcs: calculateAgentPerformance(
        player,
        wrwsData[player.subject] / teamRoundsWon
      ),
      assists: player.stats.assists,
      clutch:
        clutches[player.subject]["1v1"] +
        clutches[player.subject]["1v2"] +
        clutches[player.subject]["1v3"] +
        clutches[player.subject]["1v4"] +
        clutches[player.subject]["1v5"],
      clutchv1: clutches[player.subject]["1v1"],
      clutchv2: clutches[player.subject]["1v2"],
      clutchv3: clutches[player.subject]["1v3"],
      clutchv4: clutches[player.subject]["1v4"],
      clutchv5: clutches[player.subject]["1v5"],
      combat: player.stats.score / player.stats.roundsPlayed,
      deaths: player.stats.deaths,
      fd: firstDeaths[player.subject],
      fk: firstKills[player.subject],
      hsPercent: headshotPercents[player.subject].bullet * 100,
      id: player.subject,
      kast: kastPercents[player.subject],
      kills: player.stats.kills,
      multiKills1: multiKills[player.subject]["1"],
      multiKills2: multiKills[player.subject]["2"],
      multiKills3: multiKills[player.subject]["3"],
      multiKills4: multiKills[player.subject]["4"],
      multiKills5: multiKills[player.subject]["5"],
      name: player.gameName,
      rws: rwsData[player.subject] / teamRoundsWon,
      tag: player.tagLine,
      wrws: wrwsData[player.subject] / teamRoundsWon,
    };
  });

  return matchData;
};
