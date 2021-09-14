import type { Match } from "../types/match";

const LOCALSTORAGE_PREFIX = "valstat";

const makeLocalStorageKey = (matchId: string) => {
  return `${LOCALSTORAGE_PREFIX}-match-${matchId}`;
};

export const cache = {
  getMatch: (matchId: string): Match | null => {
    const item = localStorage.getItem(makeLocalStorageKey(matchId));
    if (item === null) {
      return null;
    }

    return JSON.parse(item) as Match;
  },
  saveMatch: (matchId: string, match: Match) => {
    const matchString = JSON.stringify(match);
    localStorage.setItem(makeLocalStorageKey(matchId), matchString);
  },
};
