import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Match, MatchHistoryMatch } from "../types/match";
import type { Player } from "../types/player";

type QueueType =
  | "competitive"
  | "custom"
  | "newmap"
  | "onefa"
  | "spikerush"
  | "unrated";

const episode3 = {
  act1: "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
  act2: "4cb622e1-4244-6da3-7276-8daaf1c01be2",
};

const matchApi = axios.create({
  baseURL: "https://valorant.iesdev.com/match/",
  params: {
    actId: episode3.act2,
    type: "subject",
  },
});

const matchHistoryApi = axios.create({
  baseURL: "https://valorant.iesdev.com/matchplayer/",
});

const playerApi = axios.create({
  baseURL: "https://valorant.iesdev.com/player/",
});

export const API = {
  getMatch: async (matchId: string): Promise<AxiosResponse<Match>> => {
    return matchApi.get<Match>(matchId);
  },

  getMatchHistory: async (
    playerId: string,
    queueTypes: QueueType[]
  ): Promise<AxiosResponse<readonly MatchHistoryMatch[]>> => {
    return matchHistoryApi.get<readonly MatchHistoryMatch[]>(playerId, {
      params: {
        actId: episode3.act2,
        offset: 0,
        queues: queueTypes.join(","),
        type: "subject",
        updatedMPs: true,
      },
    });
  },

  getPlayer: async (
    playerName: string,
    playerTag: string
  ): Promise<AxiosResponse<Player>> => {
    return playerApi.get(`${playerName}-${playerTag}`);
  },
};
