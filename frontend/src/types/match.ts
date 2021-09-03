import { Player } from "./player";
import { Round } from "./round";

// making UUID different type for later convenience
type UUID = string;

export type Map = "ascent" | "breeze" | "bind" | "icebox" | "haven";
export type Queue = "competitive" | "unrated";

export interface Team {
  readonly numPoints: number;
  readonly roundsPlayed: number;
  readonly roundsWon: number;
  readonly teamId: "Red" | "Blue";
}

export interface Match {
  readonly id: UUID;
  readonly length: number;
  readonly map: Map;
  readonly mode: string;
  readonly players: Player[];
  readonly queue: Queue;
  readonly ranked: boolean;
  readonly roundResults: Round[];
  readonly season: string;
  readonly startedAt: string;
  readonly teams: Team[];
}


export interface MatchHistoryMatch {
  playerId: string;
  matchId: string;
  tierAfterUpdate: number;
  competitiveMovement: null | "PROMOTED" | "DEMOTED";
  hsStats: {
    all: {
      last20Avg: number;
      overallAvg: number;
    },
    current: number;
    competitive: {
      last20Avg: number;
    }
  }
  rankedRatingEarned: number;
  map: Map;
  queue: Queue
  agentId: string;
  season: string;
  matchDate: string;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  score: number;
  winStatus: "win" | "loss" | "draw";
  roundsWon: number;
  roundsPlayed: number;
  playtimeMillis: number;

  // These seem unused
  /*
  matchPosition: null;
  teamPosition: null;
  mapStats: null;
  teamNumPoints: null;
  enemyTeamNumPoints: null;
  highestNumPoints: null;
  */
}
