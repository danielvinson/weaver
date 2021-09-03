import axios from "axios";

export const matchApi = axios.create({
  baseURL: "https://valorant.iesdev.com/match/",
});

export const matchHistoryApi = axios.create({
  baseURL: "https://valorant.iesdev.com/matchplayer/",
  params: {
    queues: "competitive",
  },
});
