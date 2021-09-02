import axios from "axios";

export const api = axios.create({
  baseURL: "https://valorant.iesdev.com/match/",
});
