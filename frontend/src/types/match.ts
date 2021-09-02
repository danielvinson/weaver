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
  readonly queue: "competitive" | "unrated";
  readonly ranked: boolean;
  readonly roundResults: Round[];
  readonly season: string;
  readonly startedAt: string;
  readonly teams: Team[];
}
