import type { Match } from "../types/match";

/*
  Looks like Chrome runs out of space in LocalStorage after
  about 15 matches get stored.  Going to need to cache these
  server-side pretty soon.
*/

const LOCALSTORAGE_PREFIX = "weaver";

const makeLocalStorageKey = (matchId: string) => {
  return `${LOCALSTORAGE_PREFIX}-match-${matchId}`;
};

export const cache = {
  deleteMatch: (matchId: string) => {
    localStorage.removeItem(makeLocalStorageKey(matchId));
  },

  getMatch: (matchId: string): Match | null => {
    const item = localStorage.getItem(makeLocalStorageKey(matchId));
    if (item === null) {
      return null;
    }

    if (item === "" || item === `""`) {
      cache.deleteMatch(matchId);
      return null;
    }

    return JSON.parse(item) as Match;
  },

  saveMatch: (matchId: string, match: Match) => {
    const matchString = JSON.stringify(match);
    localStorage.setItem(makeLocalStorageKey(matchId), matchString);
  },
};
