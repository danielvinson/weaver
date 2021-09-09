/* eslint-disable functional/immutable-data */
import { API } from "../api/api";
import { MatchTableCell } from "./MatchTableCell";
import { SortableTable } from "./SortableTable";
import { Spacer } from "./Spacer";
import { Switch } from "./Switch";
import { calculateClutches } from "../util/clutches";
import { calculateFirstDeaths } from "../util/firstDeaths";
import { calculateFirstKills } from "../util/firstKills";
import { calculateRWS } from "../util/rws";
import { colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { useEffect, useState } from "react";
import type { Match as MatchType } from "../types/match";

export interface PlayerData {
  readonly id: string;
  readonly team: "Blue" | "Red";
  readonly name: string;
  readonly tag: string;
  readonly agent: string;
  readonly rank: number;
  readonly combat: number;
  readonly kills: number;
  readonly deaths: number;
  readonly assists: number;
  readonly rws: number;
  readonly fk: number;
  readonly fd: number;
  readonly clutch: number;
  readonly clutchv1: number;
  readonly clutchv2: number;
  readonly clutchv3: number;
  readonly clutchv4: number;
  readonly clutchv5: number;
  readonly kast: number;
}

// Ordered
const tableHeaders = [
  { display: false, key: "id", name: "ID", width: "auto" },
  { display: false, key: "team", name: "Team", width: "auto" },
  { display: true, key: "name", name: "Name", width: "minmax(125px, 250px)" },
  { display: false, key: "tag", name: "Tag", width: "auto" },
  { display: true, key: "rank", name: "Rank", width: "70px" },
  { display: true, key: "agent", name: "Agent", width: "70px" },
  { display: true, key: "combat", name: "Combat Score", width: "170px" },
  { display: true, key: "rws", name: "RWS", width: "90px" },
  { display: true, key: "kills", name: "K", width: "50px" },
  { display: true, key: "deaths", name: "D", width: "50px" },
  { display: true, key: "assists", name: "A", width: "50px" },
  { display: true, key: "fd", name: "FD", width: "50px" },
  { display: true, key: "fk", name: "FK", width: "50px" },
  { display: true, key: "clutch", name: "Clutches", width: "auto" },
  { display: true, key: "clutchv1", name: "1v1", width: "auto" },
  { display: true, key: "clutchv2", name: "1v2", width: "auto" },
  { display: true, key: "clutchv3", name: "1v3", width: "auto" },
  { display: true, key: "clutchv4", name: "1v4", width: "auto" },
  { display: true, key: "clutchv5", name: "1v5", width: "auto" },
  { display: false, key: "kast", name: "KAST", width: "auto" },
];

interface Props {
  readonly matchId: string;
}

export const Match = ({ matchId }: Props) => {
  const [match, setMatch] = useState<MatchType>();
  const [matchTableData, setMatchTableData] = useState<PlayerData[]>();
  const [separateTeams, setSeparateTeams] = useState<boolean>(false);

  // Fetch data from API - refreshes on UUID change
  useEffect(() => {
    const getMatch = async () => {
      const res = await API.getMatch(matchId);
      setMatch(res.data);
    };

    void getMatch();
  }, [matchId]);

  // Calculate data and build table
  useEffect(() => {
    if (match === undefined) {
      return;
    }

    const tableData: PlayerData[] = [];

    const clutches = calculateClutches(match.players, match.roundResults);
    const firstKills = calculateFirstKills(match.players, match.roundResults);
    const firstDeaths = calculateFirstDeaths(match.players, match.roundResults);

    const rwsData: Record<string, number> = {};
    match.roundResults.forEach((round) => {
      const rws = calculateRWS(round, match.players);
      Object.entries(rws).forEach(([key, val]) => {
        if (!(key in rwsData)) {
          rwsData[key] = val;
        }
        rwsData[key] += val;
      });
    });

    // Build table data
    match.players.forEach((player) => {
      const totalClutches = Object.entries(
        clutches[player.subject]
      ).reduce<number>((prev, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [_, val] = cur;
        return prev + (val as number);
      }, 0);

      tableData.push({
        agent: player.characterId,
        assists: player.stats.assists,
        clutch: totalClutches,
        clutchv1: clutches[player.subject]["1v1"],
        clutchv2: clutches[player.subject]["1v2"],
        clutchv3: clutches[player.subject]["1v3"],
        clutchv4: clutches[player.subject]["1v4"],
        clutchv5: clutches[player.subject]["1v5"],
        combat: player.stats.score / player.stats.roundsPlayed,
        deaths: player.stats.deaths,
        fd: firstDeaths[player.subject],
        fk: firstKills[player.subject],
        id: player.subject,
        kast: 0,
        kills: player.stats.kills,
        name: player.gameName,
        rank: player.competitiveTier,
        rws: rwsData[player.subject] / player.stats.roundsPlayed,
        tag: player.tagLine,
        team: player.teamId,
      });
    });

    setMatchTableData(tableData);
  }, [match]);

  if (matchTableData === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ ...common.row, alignItems: "center" }}>
        <Switch
          value={separateTeams}
          onChange={(newValue: boolean) => setSeparateTeams(newValue)}
        />
        <Spacer width="5px" />
        <span style={{ color: colors.white, fontSize: "0.9em" }}>
          Separate Teams
        </span>
      </div>
      <div style={{ marginTop: "5vh", width: "90vw" }}>
        {separateTeams ? (
          <>
            <SortableTable
              headers={tableHeaders}
              data={matchTableData.filter((p) => p.team === "Blue")}
              defaultSort={{
                direction: "Descending",
                key: "combat",
              }}
              renderCell={(key, val, item) => (
                <MatchTableCell dataKey={key} value={val} player={item} />
              )}
            />
            <SortableTable
              headers={tableHeaders}
              data={matchTableData.filter((p) => p.team === "Red")}
              defaultSort={{
                direction: "Descending",
                key: "combat",
              }}
              renderCell={(key, val, item) => (
                <MatchTableCell dataKey={key} value={val} player={item} />
              )}
            />
          </>
        ) : (
          <SortableTable
            headers={tableHeaders}
            data={matchTableData}
            defaultSort={{
              direction: "Descending",
              key: "combat",
            }}
            renderCell={(key, val, item) => (
              <MatchTableCell dataKey={key} value={val} player={item} />
            )}
          />
        )}
      </div>
    </>
  );
};
