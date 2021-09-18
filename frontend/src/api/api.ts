import { cache } from "./cache";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Match, MatchHistoryMatch, QueueType } from "../types/match";
import type { Player } from "../types/player";

const episodeIds = {
  episode1: {},
  episode2: {},
  episode3: {
    act1: "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
    act2: "4cb622e1-4244-6da3-7276-8daaf1c01be2",
  },
};

const baseApi = axios.create({
  baseURL: "https://valorant.iesdev.com/",
});

export const API = {
  getMatch: async (matchId: string): Promise<Match> => {
    const cachedMatch = cache.getMatch(matchId);
    if (cachedMatch !== null) return cachedMatch;

    const axiosResponse = await baseApi.get<Match>("match/" + matchId, {
      params: {
        actId: episodeIds.episode3.act2,
        type: "subject",
      },
    });

    cache.saveMatch(matchId, axiosResponse.data);

    return axiosResponse.data;
  },

  getMatchHistory: async (
    playerId: string,
    queueTypes: QueueType[]
  ): Promise<AxiosResponse<readonly MatchHistoryMatch[]>> => {
    return baseApi.get<readonly MatchHistoryMatch[]>(
      "matchplayer/" + playerId,
      {
        params: {
          actId: episodeIds.episode3.act2,
          offset: 0,
          queues: queueTypes.includes("custom")
            ? queueTypes.join(",") + ","
            : queueTypes.join(","),
          type: "subject",
          updatedMPs: true,
        },
      }
    );
  },

  getPlayer: async (
    playerName: string,
    playerTag: string
  ): Promise<AxiosResponse<Player>> => {
    return baseApi.get(`player/${playerName}-${playerTag}`);
  },
};
