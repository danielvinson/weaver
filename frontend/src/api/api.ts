import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Match, MatchHistoryMatch } from "../types/match";

const matchApi = axios.create({
  baseURL: "https://valorant.iesdev.com/match/",
  params: {
    actId: "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
    type: "subject"
  }
});

const matchHistoryApi = axios.create({
  baseURL: "https://valorant.iesdev.com/matchplayer/",
  params: {
    queues: "competitive",
  },
});

export const API = {
  getMatch: async (matchId: string): Promise<AxiosResponse<Match>> => {
    return matchApi.get<Match>(matchId);
  },
  getMatchHistory: async (matchId: string): Promise<AxiosResponse<readonly MatchHistoryMatch[]>> => {
    return matchHistoryApi.get<readonly MatchHistoryMatch[]>(matchId);
  },
};
