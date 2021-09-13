export interface Match {
  readonly won: boolean;
  readonly rank: number;
  readonly matchId: string;
  readonly startedAt: string;
}
export type SeasonRank = Record<
  string,
  {
    readonly topMatches: Match[];
    readonly totalMatchesPlayed: number;
    readonly nonPlacementMatchesWon: number;
    readonly nonPlacementMatchesPlayed: number;
  }
>;
export interface Player {
  readonly id: string;
  readonly subject: string;
  readonly name: string;
  readonly tag: string;
  readonly puuid: string;
  readonly rank: number;
  readonly seasonRanks: SeasonRank[];
  readonly createdAt: string;
  readonly lastPlayed: string;
  readonly rankedRating: number;
  readonly region: "na";
  readonly updatedMPs: boolean;
  readonly level: null;
  readonly xp: null;
  readonly ranks: {
    readonly competitive: {
      readonly tier: number;
    };
  }
}
