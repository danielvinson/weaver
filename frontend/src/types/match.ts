import type { Player } from "./player";
import type { Round } from "./round";

// making UUID different type for later convenience
type UUID = string;

export type MapName = "ascent" | "bind" | "breeze" | "haven" | "icebox";
export type Queue = "competitive" | "unrated";

export interface Team {
  readonly numPoints: number;
  readonly roundsPlayed: number;
  readonly roundsWon: number;
  readonly teamId: "Blue" | "Red";
}

export interface Match {
  readonly id: UUID;
  readonly length: number;
  readonly map: MapName;
  readonly mode: string;
  readonly players: readonly Player[];
  readonly queue: Queue;
  readonly ranked: boolean;
  readonly roundResults: readonly Round[];
  readonly season: string;
  readonly startedAt: string;
  readonly teams: readonly Team[];
}


export interface MatchHistoryMatch {
  readonly playerId: string;
  readonly matchId: string;
  readonly tierAfterUpdate: number;
  readonly competitiveMovement: "DEMOTED" | "PROMOTED" | null;
  readonly hsStats: {
    readonly all: {
      readonly last20Avg: number;
      readonly overallAvg: number;
    },
    readonly current: number;
    readonly competitive: {
      readonly last20Avg: number;
    }
  }
  readonly rankedRatingEarned: number;
  readonly map: MapName;
  readonly queue: Queue
  readonly agentId: string;
  readonly season: string;
  readonly matchDate: string;
  readonly kills: number;
  readonly deaths: number;
  readonly assists: number;
  readonly damage: number;
  readonly score: number;
  readonly winStatus: "draw" | "loss" | "win";
  readonly roundsWon: number;
  readonly roundsPlayed: number;
  readonly playtimeMillis: number;

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
