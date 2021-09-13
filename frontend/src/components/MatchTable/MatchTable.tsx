/* eslint-disable functional/immutable-data */
import { API } from "../../api/api";
import { MatchTableCell } from "./MatchTableCell";
import { MatchTableSettings } from "./MatchTableSettings";
import { SortableTable } from "../SortableTable";
import { Spacer } from "../Spacer";
import { Switch } from "../Switch";
import { calculateClutches } from "../../util/clutches";
import { calculateFirstDeaths } from "../../util/firstDeaths";
import { calculateFirstKills } from "../../util/firstKills";
import { calculateMatchMultikills } from "../../util/multiKills";
import { calculateRWS } from "../../util/rws";
import { colors } from "../../util/colorPalette";
import { common } from "../../util/styles";
import { default as lodash } from "lodash";
import { useEffect, useState } from "react";
import type { Match as MatchType } from "../../types/match";
import type { Setting } from "./MatchTableSettings";
import type { TableHeader } from "../SortableTable";

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
  readonly multiKills1: number;
  readonly multiKills2: number;
  readonly multiKills3: number;
  readonly multiKills4: number;
  readonly multiKills5: number;
}

// Ordered - order is added by func on load
const defaultTableHeaders = [
  { display: false, key: "id", name: "ID", width: "auto" },
  { display: false, key: "team", name: "Team", width: "auto" },
  { display: true, key: "name", name: "Name", width: "minmax(125px, 250px)" },
  { display: false, key: "tag", name: "Tag", width: "auto" },
  { display: true, key: "rank", name: "Rank", width: "70px" },
  { display: true, key: "agent", name: "Agent", width: "70px" },
  { display: true, key: "combat", name: "Combat Score", width: "170px" },
  {
    display: true,
    key: "rws",
    name: "RWS",
    tooltip:
      "Round Win Share calculated by average combat scores for only rounds which that player's team won",
    width: "90px",
  },
  { display: true, key: "kills", name: "K", width: "50px" },
  { display: true, key: "deaths", name: "D", width: "50px" },
  { display: true, key: "assists", name: "A", width: "50px" },
  {
    display: false,
    key: "fd",
    name: "FD",
    tooltip: "First Deaths",
    width: "50px",
  },
  {
    display: true,
    key: "fk",
    name: "FK",
    tooltip: "First Kills",
    width: "50px",
  },
  { display: true, key: "clutch", name: "Clutches", width: "auto" },
  { display: true, key: "clutchv1", name: "1v1", width: "auto" },
  { display: true, key: "clutchv2", name: "1v2", width: "auto" },
  { display: true, key: "clutchv3", name: "1v3", width: "auto" },
  { display: true, key: "clutchv4", name: "1v4", width: "auto" },
  { display: true, key: "clutchv5", name: "1v5", width: "auto" },
  { display: false, key: "kast", name: "KAST", width: "auto" },
  {
    display: false,
    key: "multiKills1",
    name: "1k",
    tooltip: "Single Kill Rounds",
    width: "auto",
  },
  {
    display: false,
    key: "multiKills2",
    name: "2k",
    tooltip: "Double Kill Rounds",
    width: "auto",
  },
  {
    display: false,
    key: "multiKills3",
    name: "3k",
    tooltip: "Triple Kill Rounds",
    width: "auto",
  },
  {
    display: false,
    key: "multiKills4",
    name: "4k",
    tooltip: "Quadra Kill Rounds",
    width: "auto",
  },
  {
    display: false,
    key: "multiKills5",
    name: "5k",
    tooltip: "Penta Kill Rounds",
    width: "auto",
  },
];

interface Props {
  readonly matchId: string;
}

export const MatchTable = ({ matchId }: Props) => {
  const [match, setMatch] = useState<MatchType>();
  const [matchTableData, setMatchTableData] = useState<PlayerData[]>();
  const [separateTeams, setSeparateTeams] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(
    defaultTableHeaders.map((th, index) => ({ ...th, order: index }))
  );

  // Fetch data from API - refreshes on UUID change
  useEffect(() => {
    const getMatch = async () => {
      const res = await API.getMatch(matchId);
      setMatch(res.data);
      console.log(res.data);
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

    const multiKills = calculateMatchMultikills(
      match.players,
      match.roundResults
    );

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
        multiKills1: multiKills[player.subject]["1"],
        multiKills2: multiKills[player.subject]["2"],
        multiKills3: multiKills[player.subject]["3"],
        multiKills4: multiKills[player.subject]["4"],
        multiKills5: multiKills[player.subject]["5"],
        name: player.gameName,
        rank: player.competitiveTier,
        rws: rwsData[player.subject] / player.stats.roundsPlayed,
        tag: player.tagLine,
        team: player.teamId,
      });
    });

    setMatchTableData(tableData);
  }, [match]);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleChangeSetting = (key: string, newValue: boolean) => {
    const oldHeader = tableHeaders.find((th) => th.key === key);
    if (!oldHeader) {
      return; // shouldn't be possible
    }
    const newHeader: TableHeader = {
      ...oldHeader,
      display: newValue,
    };
    const otherHeaders = tableHeaders.filter((th) => th.key !== key);
    setTableHeaders(lodash.sortBy(otherHeaders.concat(newHeader), ["order"]));
  };

  if (matchTableData === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Options */}
      <div
        style={{
          ...common.row,
          alignItems: "center",
          justifyContent: "space-between",
          width: "90vw",
        }}
      >
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

        <div style={{ position: "relative" }}>
          <span
            style={{
              alignSelf: "flex-end",
              color: colors.white,
              cursor: "pointer",
              fontSize: "2em",
            }}
            onClick={() => handleSettingsClick()}
          >
            &#x2699;
          </span>
          {settingsOpen && (
            <MatchTableSettings
              onChangeSetting={handleChangeSetting}
              settings={tableHeaders.map<Setting>((th) => ({
                key: th.key,
                name: th.name,
                value: th.display,
              }))}
            />
          )}
        </div>
      </div>
      <Spacer height="5px" />
      <div style={{ width: "90vw" }}>
        {separateTeams ? (
          <>
            <SortableTable
              headers={tableHeaders}
              data={matchTableData.filter((p) => p.team === "Blue")}
              defaultSort={{
                direction: "Descending",
                key: "combat",
              }}
              renderCell={(key, index, val, item) => (
                <MatchTableCell
                  dataKey={key}
                  index={index}
                  value={val}
                  player={item}
                />
              )}
            />
            <SortableTable
              headers={tableHeaders}
              data={matchTableData.filter((p) => p.team === "Red")}
              defaultSort={{
                direction: "Descending",
                key: "combat",
              }}
              renderCell={(key, index, val, item) => (
                <MatchTableCell
                  dataKey={key}
                  index={index}
                  value={val}
                  player={item}
                />
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
            renderCell={(key, index, val, item) => (
              <MatchTableCell
                dataKey={key}
                index={index}
                value={val}
                player={item}
              />
            )}
          />
        )}
      </div>
    </>
  );
};
