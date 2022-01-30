import type { Round } from "./round";

// making UUID different type for later convenience
type UUID = string;

export type TeamNameUnion = "Blue" | "Neutral" | "Red";
export type MapNameUnion =
  | "ascent"
  | "bind"
  | "breeze"
  | "fracture"
  | "haven"
  | "icebox"
  | "port"
  | "split";

export type QueueTypeUnion =
  | ""
  | "competitive"
  | "custom"
  | "deathmatch"
  | "gungame"
  | "newmap"
  | "onefa"
  | "spikerush"
  | "unrated";

export type TeamName = string;
export type MapName = string;
export type QueueType = string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewPlayerExperienceDetails {} // boring data, ignoring

export interface PlatformInfo {
  readonly platformChipset: string;
  readonly platformOS: string;
  readonly platformOSVersion: string;
  readonly platformType: string;
}

export interface RoundDamage {
  readonly damage: number;
  readonly receiver: UUID;
  readonly round: number;
}

export interface PlayerStats {
  readonly abilityCasts: {
    readonly ability1Casts: number;
    readonly ability2Casts: number;
    readonly grenadeCasts: number;
    readonly ultimateCasts: number;
  };
  readonly assists: number;
  readonly deaths: number;
  readonly kills: number;
  readonly playtimeMillis: number;
  readonly roundsPlayed: number;
  readonly score: number;
}

export interface Player {
  readonly accountLevel: number;
  readonly behaviorFactors?: {
    readonly afkRounds: number;
    readonly stayedInSpawnRounds: number;
  };
  readonly characterId: string | null; // null for spectator
  readonly competitiveTier: number;
  readonly gameName: string;
  readonly newPlayerExperienceDetails?: NewPlayerExperienceDetails;
  readonly partyId: UUID;
  readonly platformInfo: PlatformInfo;
  readonly playerCard: UUID;
  readonly playerTitle: UUID;
  readonly roundDamage: readonly RoundDamage[] | null; // null for spectator
  readonly sessionPlaytimeMinutes: number;
  readonly stats: PlayerStats | null; // null for spectator
  readonly subject: UUID;
  readonly tagLine: string;
  readonly teamId: TeamName;
}

export interface NonSpectatorPlayer {
  readonly accountLevel: number;
  readonly behaviorFactors?: {
    readonly afkRounds: number;
    readonly stayedInSpawnRounds: number;
  };
  readonly characterId: string;
  readonly competitiveTier: number;
  readonly gameName: string;
  readonly newPlayerExperienceDetails?: NewPlayerExperienceDetails;
  readonly partyId: UUID;
  readonly platformInfo: PlatformInfo;
  readonly playerCard: UUID;
  readonly playerTitle: UUID;
  readonly roundDamage: readonly RoundDamage[];
  readonly sessionPlaytimeMinutes: number;
  readonly stats: PlayerStats;
  readonly subject: UUID;
  readonly tagLine: string;
  readonly teamId: TeamName;
}

export interface Team {
  readonly numPoints: number;
  readonly roundsPlayed: number;
  readonly roundsWon: number;
  readonly teamId: TeamName;
}

export interface Match {
  readonly id: UUID;
  readonly length: number;
  readonly map: MapName;
  readonly mode: string;
  readonly players: readonly Player[];
  readonly queue: QueueType;
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
    };
    readonly current: number;
    readonly competitive: {
      readonly last20Avg: number;
    };
  };
  readonly rankedRatingEarned: number;
  readonly map: MapName;
  readonly queue: QueueType;
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
