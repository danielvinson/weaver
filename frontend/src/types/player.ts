// making UUID different type for later convenience
type UUID = string;

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

export interface Stats {
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
  readonly behaviorFactors: {
    readonly afkRounds: number;
    readonly statedInSpawnRounds: 0;
  };
  readonly characterId: string;
  readonly competitiveTier: number;
  readonly gameName: string;
  readonly newPlayerExperienceDetails: NewPlayerExperienceDetails;
  readonly partyId: UUID;
  readonly platformInfo: PlatformInfo;
  readonly playerCard: UUID;
  readonly playerTitle: UUID;
  readonly roundDamage: RoundDamage[];
  readonly sessionPlaytimeMinutes: number;
  readonly stats: Stats;
  readonly subject: UUID;
  readonly tagLine: string;
  readonly teamId: "Red" | "Blue";
}
