/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Spacer } from "../components/Spacer";
import { TournamentStatTable } from "../components/TournamentStatTable/TournamentStatTable";
import { colors } from "../util/colorPalette";
import { groupA, groupB } from "../data/boomerSeason4/championshipMatches";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Match } from "../types/match";

export type GroupName = "A" | "B" | undefined;
export interface SavedMatchFile {
  readonly match_type: string; //"puuid" | "subject";
  readonly data: Match;
}

const styles: Record<string, CSSProperties> = {
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
    `../data/boomerSeason4/championship/${matchId}.json`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  ).then((module) => module.default);

  return data as SavedMatchFile;
};

const groupMatchIds = {
  A: Object.values(groupA).flat(),
  B: Object.values(groupB).flat(),
};

export const BoomerSeason4Championship = () => {
  const [matchData, setMatchData] = useState<Match[]>();
  const [selectedGroup, setSelectedGroup] = useState<GroupName>();

  useEffect(() => {
    const getAndSetMatchData = async () => {
      const matchIds =
        selectedGroup !== undefined
          ? groupMatchIds[selectedGroup]
          : Object.values(groupMatchIds).flat();

      const matches = matchIds.map(async (matchId) => {
        return getMatchData(matchId);
      });

      const resolvedMatches = await Promise.all(matches);
      const resolvedMatchData = resolvedMatches.map((match) => match.data);
      setMatchData([...resolvedMatchData]);
    };

    void getAndSetMatchData();
  }, [selectedGroup]);

  return (
    <div>
      <span
        style={{
          color: "white",
          fontSize: "1.2em",
          paddingBottom: "15px",
          paddingTop: "15px",
        }}
      >
        Boomerants: Season 4 Championship Stats
      </span>

      <Spacer height="15px" />

      <div>
        <span style={{ color: "white" }}>Filter by group: </span>
        <select
          defaultValue={undefined}
          value={selectedGroup}
          style={styles.select}
          onChange={(e) => {
            if (e.target.value === "all") {
              setSelectedGroup(undefined);
            } else {
              setSelectedGroup(e.target.value as GroupName);
            }
          }}
        >
          <option value="all">All Groups</option>
          <option value="A">Group A</option>
          <option value="B">Group B</option>
        </select>
      </div>

      {matchData !== undefined ? (
        <TournamentStatTable matches={matchData} />
      ) : (
        <span style={{ color: "white" }}>Loading...</span>
      )}

      <Spacer height="25px" />
    </div>
  );
};
