/* eslint-disable functional/immutable-data */
import type { AggregateStats, PlayerData } from "./types";

export const aggregatePlayerData = (data: PlayerData[]): AggregateStats => {
  const playerData: AggregateStats = {};
  data.map((matchPlayerData) => {
    if (!(matchPlayerData.id in playerData)) {
      playerData[matchPlayerData.id] = {
        agent: [matchPlayerData.agent],
        agentWeightedAcs: [matchPlayerData.agentWeightedAcs],
        agentWeightedWrwcs: [matchPlayerData.agentWeightedWrwcs],
        assists: [matchPlayerData.assists],
        clutch: [matchPlayerData.clutch],
        clutchv1: [matchPlayerData.clutchv1],
        clutchv2: [matchPlayerData.clutchv2],
        clutchv3: [matchPlayerData.clutchv3],
        clutchv4: [matchPlayerData.clutchv4],
        clutchv5: [matchPlayerData.clutchv5],
        combat: [matchPlayerData.combat],
        deaths: [matchPlayerData.deaths],
        fd: [matchPlayerData.fd],
        fk: [matchPlayerData.fk],
        hsPercent: [matchPlayerData.hsPercent],
        id: matchPlayerData.id,
        kast: [matchPlayerData.kast],
        kills: [matchPlayerData.kills],
        multiKills1: [matchPlayerData.multiKills1],
        multiKills2: [matchPlayerData.multiKills2],
        multiKills3: [matchPlayerData.multiKills3],
        multiKills4: [matchPlayerData.multiKills4],
        multiKills5: [matchPlayerData.multiKills5],
        name: matchPlayerData.name,
        rws: [matchPlayerData.rws],
        tag: matchPlayerData.tag,
        wrws: [matchPlayerData.wrws],
      };
    } else {
      const existingData = playerData[matchPlayerData.id];
      playerData[matchPlayerData.id] = {
        agent: [...existingData.agent, matchPlayerData.agent],
        agentWeightedAcs: [
          ...existingData.agentWeightedAcs,
          matchPlayerData.agentWeightedAcs,
        ],
        agentWeightedWrwcs: [
          ...existingData.agentWeightedWrwcs,
          matchPlayerData.agentWeightedWrwcs,
        ],
        assists: [...existingData.assists, matchPlayerData.assists],
        clutch: [...existingData.clutch, matchPlayerData.clutch],
        clutchv1: [...existingData.clutchv1, matchPlayerData.clutchv1],
        clutchv2: [...existingData.clutchv2, matchPlayerData.clutchv2],
        clutchv3: [...existingData.clutchv3, matchPlayerData.clutchv3],
        clutchv4: [...existingData.clutchv4, matchPlayerData.clutchv4],
        clutchv5: [...existingData.clutchv5, matchPlayerData.clutchv5],
        combat: [...existingData.combat, matchPlayerData.combat],
        deaths: [...existingData.deaths, matchPlayerData.deaths],
        fd: [...existingData.fd, matchPlayerData.fd],
        fk: [...existingData.fk, matchPlayerData.fk],
        hsPercent: [...existingData.hsPercent, matchPlayerData.hsPercent],
        id: matchPlayerData.id,
        kast: [...existingData.kast, matchPlayerData.kast],
        kills: [...existingData.kills, matchPlayerData.kills],
        multiKills1: [...existingData.multiKills1, matchPlayerData.multiKills1],
        multiKills2: [...existingData.multiKills2, matchPlayerData.multiKills2],
        multiKills3: [...existingData.multiKills3, matchPlayerData.multiKills3],
        multiKills4: [...existingData.multiKills4, matchPlayerData.multiKills4],
        multiKills5: [...existingData.multiKills5, matchPlayerData.multiKills5],
        name: matchPlayerData.name,
        rws: [...existingData.rws, matchPlayerData.rws],
        tag: matchPlayerData.tag,
        wrws: [...existingData.wrws, matchPlayerData.wrws],
      };
    }
  });

  return playerData;
};
