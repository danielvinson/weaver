/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { cache } from "./cache";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Match, MatchHistoryMatch, QueueType } from "../types/match";
import type { Player } from "../types/player";

export const episodeIds = {
  episode1: {},
  episode2: {},
  episode3: {
    act1: "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
    act2: "4cb622e1-4244-6da3-7276-8daaf1c01be2",
    act3: "a16955a5-4ad0-f761-5e9e-389df1c892fb",
  },
  episode4: {
    act1: "573f53ac-41a5-3a7d-d9ce-d6a6298e5704",
    act2: "d929bc38-4ab6-7da4-94f0-ee84f8ac141e",
  },
};

const baseApi = axios.create({
  baseURL: "https://valorant.iesdev.com/",
});

export const API = {
  getMatch: async (
    matchId: string,
    actId: string,
    type: "puuid" | "subject" = "subject"
  ): Promise<Match> => {
    const cachedMatch = cache.getMatch(matchId);
    if (cachedMatch !== null) return cachedMatch;

    const axiosResponse = await baseApi.get<Match>("match/" + matchId, {
      params: {
        actId,
        type,
      },
    });

    cache.saveMatch(matchId, axiosResponse.data);

    return axiosResponse.data;
  },

  getMatchHistory: async (
    playerId: string,
    actId: string,
    queueTypes: QueueType[]
  ): Promise<AxiosResponse<readonly MatchHistoryMatch[]>> => {
    return baseApi.get<readonly MatchHistoryMatch[]>(
      "matchplayer/" + playerId,
      {
        params: {
          actId: actId,
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
