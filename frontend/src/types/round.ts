// making UUID different type for later convenience
type UUID = string;

export interface Coordinate {
  readonly x: number;
  readonly y: number;
}

export interface PlayerEconomy {
  readonly armor: UUID | "";
  readonly loadoutValue: number;
  readonly remaining: number;
  readonly spent: number;
  readonly subject: UUID;
  readonly weapon: UUID;
}

export interface PlayerScore {
  readonly score: number;
  readonly subject: UUID;
}

export interface PlayerDamage {
  readonly bodyshots: number;
  readonly damage: number;
  readonly headshots: number;
  readonly legshots: number;
  readonly receiver: UUID;
}

export interface PlayerKills {
  readonly assistants: [];
  readonly finishingDamage: {
    damageItem: UUID;
    damageType: "Weapon" | string;
    isSecondaryFireMode: boolean;
  };
  readonly gameTime: number;
  readonly killer: UUID;
  readonly playerLocations: {
    readonly location: Coordinate;
    readonly subject: UUID;
    readonly viewRadians: number;
  };
  readonly roundTime: number;
  readonly victim: UUID;
  readonly victimLocation: Coordinate;
}

export interface PlayerStat {
  readonly ability: {
    readonly grenadeEffects: null;
    readonly ability1Effects: null;
    readonly ability2Effects: null;
    readonly ultimateEffects: null;
  };
  readonly damage: PlayerDamage[];
  readonly economy: Omit<PlayerEconomy, "subject">;
  readonly kills: PlayerKills[];
  readonly score: number;
  readonly stayedInSpawn: boolean;
  readonly subject: UUID;
  readonly wasAfk: boolean;
}

export interface Round {
  readonly bombPlanter: UUID | null;
  readonly defuseLocation: Coordinate | null;
  readonly defusePlayerLocations: Coordinate[] | null;
  readonly defuseRoundTime: number;
  readonly plantLocation: Coordinate;
  readonly plantPlayerLocations: Coordinate[];
  readonly plantRoundTime: number;
  readonly plantSite: "A" | "B" | "C" | null;
  readonly playerEconomies: PlayerEconomy[];
  readonly playerScores: PlayerScore[];
  readonly playerStats: PlayerStat[];
  readonly roundCeremony: string;
  readonly roundNum: number;
  readonly roundResult: "Eliminated" | string;
  readonly roundResultCode: "Elimination" | string;
  readonly winningTeam: "Red" | "Blue";
}
