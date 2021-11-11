import type { MapName } from "../types/match";

export type TeamId = string;

export interface LeaguePlayer {
  readonly valorantName: string;
  readonly valorantTag: string;
  readonly discordName: string;
  readonly discordTag: string;
}

export interface LeagueTeam {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly captain: LeaguePlayer;
  readonly players: LeaguePlayer[];
}

export interface LeagueMatch {
  readonly homeTeam: TeamId;
  readonly awayTeam: TeamId;
  readonly matchId: string;
  readonly weekNumber: number;
  readonly map: MapName;
}

export interface League {
  readonly name: string;
  readonly teams: LeagueTeam[];
  readonly matches: LeagueMatch[];
}
