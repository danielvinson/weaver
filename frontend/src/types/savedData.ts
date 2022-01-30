// Special types for importing from json files - union types removed

import type { Coordinate } from "./round";
import type { Match } from "./match";

export interface Location {
  readonly subject: string;
  readonly viewRadians: number;
  readonly location: Coordinate;
}

export interface SavedMatchFile {
  readonly match_type: string; //"puuid" | "subject";
  readonly data: Match;
}

export interface SavedMatch {
  readonly id: string;
  readonly length: number;
  readonly map: string;
  readonly mode: string;
  readonly players: readonly SavedPlayer[];
  readonly queue: string;
  readonly ranked: boolean;
  readonly roundResults: readonly SavedRound[];
  readonly season: string;
  readonly startedAt: string;
  readonly teams: readonly {
    readonly numPoints: number;
    readonly roundsPlayed: number;
    readonly roundsWon: number;
    readonly teamId: string;
  }[];
}

export interface SavedRoundDamage {
  readonly damage: number;
  readonly receiver: string;
  readonly round: number;
}

export interface SavedPlayer {
  readonly accountLevel: number;
  readonly behaviorFactors?: {
    readonly afkRounds: number;
    readonly stayedInSpawnRounds: number;
  };
  readonly characterId: string | null; // null for spectator
  readonly competitiveTier: number;
  readonly gameName: string;
  readonly newPlayerExperienceDetails?: Record<string, unknown>;
  readonly partyId: string;
  readonly platformInfo: {
    readonly platformChipset: string;
    readonly platformOS: string;
    readonly platformOSVersion: string;
    readonly platformType: string;
  };
  readonly playerCard: string;
  readonly playerTitle: string;
  readonly roundDamage: SavedRoundDamage[] | null; // null for spectator
  readonly sessionPlaytimeMinutes: number;
  readonly stats: {
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
  } | null; // null for spectator
  readonly subject: string;
  readonly tagLine: string;
  readonly teamId: string;
}

export interface SavedPlayerKills {
  readonly assistants: string[];
  readonly finishingDamage: {
    readonly damageItem: string;
    readonly damageType: string | "Weapon";
    readonly isSecondaryFireMode: boolean;
  };
  readonly gameTime: number;
  readonly killer: string;
  readonly playerLocations: Location[];
  readonly roundTime: number;
  readonly victim: string;
  readonly victimLocation: Coordinate;
}

export interface SavedRound {
  readonly bombPlanter?: string | null;
  readonly defuseLocation: Coordinate | null;
  readonly defusePlayerLocations: readonly Location[] | null;
  readonly defuseRoundTime: number;
  readonly plantLocation: Coordinate | null;
  readonly plantPlayerLocations: readonly Location[] | null;
  readonly plantRoundTime: number;
  readonly plantSite: string | null;
  readonly playerEconomies: readonly {
    readonly armor: string;
    readonly loadoutValue: number;
    readonly remaining: number;
    readonly spent: number;
    readonly subject: string;
    readonly weapon: string;
  }[];
  readonly playerScores: readonly {
    readonly score: number;
    readonly subject: string;
  }[];
  readonly playerStats: readonly {
    readonly ability: {
      readonly grenadeEffects: null;
      readonly ability1Effects: null;
      readonly ability2Effects: null;
      readonly ultimateEffects: null;
    };
    readonly damage: readonly {
      readonly bodyshots: number;
      readonly damage: number;
      readonly headshots: number;
      readonly legshots: number;
      readonly receiver: string;
    }[];
    readonly economy: {
      readonly armor: string;
      readonly loadoutValue: number;
      readonly remaining: number;
      readonly spent: number;
      readonly weapon: string;
    };
    readonly kills: readonly SavedPlayerKills[];
    readonly score: number;
    readonly stayedInSpawn: boolean;
    readonly subject: string;
    readonly wasAfk: boolean;
  }[];
  readonly roundCeremony: string;
  readonly roundNum: number;
  readonly roundResult: string;
  readonly roundResultCode: string;
  readonly winningTeam: string;
}
