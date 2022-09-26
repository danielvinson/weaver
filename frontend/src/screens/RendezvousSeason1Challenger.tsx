/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Spacer } from "../components/Spacer";
import { TournamentStatTable } from "../components/TournamentStatTable/TournamentStatTable";
import { colors } from "../util/colorPalette";
import { matches } from "../data/rendezvous/challenger";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Match } from "../types/match";

export interface SavedMatchFile {
  readonly match_type: string; //"puuid" | "subject";
  readonly data: Match;
}

const styles: Record<string, CSSProperties> = {
  heading: {
    color: "white",
    fontSize: "1.2em",
    paddingBottom: "15px",
    paddingTop: "15px",
  },
  select: {
    background: colors.shadow,
    color: colors.white,
    fontSize: "1em",
    height: "40px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
};

const getMatchData = async (matchId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await import(
    `../data/rendezvous/challenger/${matchId}.json`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  ).then((module) => module.default);

  return data as SavedMatchFile;
};

export const RendezvousSeason1Challenger = () => {
  const [matchData, setMatchData] = useState<Match[]>();

  useEffect(() => {
    const getAndSetMatchData = async () => {
      const matchIds = Object.values(matches).flat();
      const matchDataPromises = matchIds.map(async (matchId) => {
        return getMatchData(matchId);
      });

      const resolvedMatches = await Promise.all(matchDataPromises);
      const resolvedMatchData = resolvedMatches.map((match) => match.data);
      setMatchData([...resolvedMatchData]);
    };

    void getAndSetMatchData();
  }, []);

  return (
    <div>
      <span style={styles.heading}>Rendezvous: Season 1 Challenger Stats</span>

      <Spacer height="15px" />

      {matchData !== undefined ? (
        <TournamentStatTable matches={matchData} />
      ) : (
        <span style={{ color: "white" }}>Loading...</span>
      )}

      <Spacer height="25px" />
    </div>
  );
};
