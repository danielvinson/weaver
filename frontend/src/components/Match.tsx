import { CSSProperties, useState } from "react";
import { useEffect } from "react";
import { api } from "../api/api";
import { Match as MatchType } from "../types/match";
import { calculateClutches } from "../util/clutches";
import { calculateRWS } from "../util/rws";
import { colors, gradients } from "../util/colorPalette";
import { RankIcon } from "./RankIcon";
import { calculateFirstKills } from "../util/firstKills";
import { calculateFirstDeaths } from "../util/firstDeaths";
import { AgentIcon } from "./AgentIcon";
import { sortData, SortDirection } from "../util/sort";

interface PlayerData {
  readonly id: string;
  readonly team: "Red" | "Blue";
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

interface Props {
  readonly uuid: string;
}

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: colors.background,
    minHeight: "100vh",
    minWidth: "800px",
    padding: "1em",
  },
  table: {
    display: "grid",
    border: "1px solid #222",
    borderTop: "3px solid #222",
  },
  tableItem: {
    padding: "4px",
    color: colors.white,
    borderLeft: "1px solid rgba(0,0,0,.1)",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: {
    backgroundColor: colors.shadow,
    color: colors.white,
    fontWeight: "bold",
    boxShadow: "0px 1px 1px rgba(255,255,255,0.2)",
    cursor: "pointer",
  },
};

const tableHeaders = {
  id: { name: "ID", display: false, width: "auto" },
  team: { name: "Team", display: false, width: "auto" },
  name: { name: "Name", display: true, width: "minmax(125px, 250px)" },
  tag: { name: "Tag", display: false, width: "auto" },
  agent: { name: "Agent", display: true, width: "70px" },
  rank: { name: "Rank", display: true, width: "70px" },
  kills: { name: "K", display: true, width: "50px" },
  deaths: { name: "D", display: true, width: "50px" },
  assists: { name: "A", display: true, width: "50px" },
  combat: { name: "Combat Score", display: true, width: "170px" },
  rws: { name: "RWS", display: true, width: "90px" },
  fk: { key: "fk", name: "FK", display: true, width: "50px" },
  fd: { key: "fd", name: "FD", display: true, width: "50px" },
  clutch: { name: "Clutches", display: true, width: "auto" },
  clutchv1: { name: "1v1", display: true, width: "auto" },
  clutchv2: { name: "1v2", display: true, width: "auto" },
  clutchv3: { name: "1v3", display: true, width: "auto" },
  clutchv4: { name: "1v4", display: true, width: "auto" },
  clutchv5: { name: "1v5", display: true, width: "auto" },
  kast: { name: "KAST", display: false, width: "auto" },
};

type TableHeaderKey = keyof typeof tableHeaders;

export const Match = ({ uuid }: Props) => {
  const [match, setMatch] = useState<MatchType>();
  const [matchTableData, setMatchTableData] = useState<PlayerData[]>();
  const [sortBy, setSortBy] = useState<{
    key: TableHeaderKey;
    direction: SortDirection;
  }>({ key: "combat", direction: "Ascending" });

  // Fetch data from API - refreshes on UUID change
  useEffect(() => {
    api.get(uuid).then((res: any) => {
      setMatch(res.data);
    });
  }, [uuid]);

  // Calculate data and build table
  useEffect(() => {
    if (match === undefined) {
      return;
    }

    console.log(match);

    let matchTableData: PlayerData[] = [];

    const clutches = calculateClutches(match?.players, match?.roundResults);
    console.log(clutches);
    const firstKills = calculateFirstKills(match?.players, match?.roundResults);
    const firstDeaths = calculateFirstDeaths(
      match?.players,
      match?.roundResults
    );

    let rwsData: Record<string, number> = {};
    match.roundResults.map((round) => {
      const rws = calculateRWS(round, match.players);
      Object.entries(rws).map(([key, val]) => {
        if (!(key in rwsData)) {
          rwsData[key] = val;
        }
        rwsData[key] += val;
      });
    });

    // Build table data
    match.players.map((player) => {
      matchTableData.push({
        id: player.subject,
        team: player.teamId,
        name: player.gameName,
        tag: player.tagLine,
        agent: player.characterId,
        rank: player.competitiveTier,
        kills: player.stats.kills,
        deaths: player.stats.deaths,
        assists: player.stats.assists,
        combat: player.stats.score / player.stats.roundsPlayed,
        rws: rwsData[player.subject] / player.stats.roundsPlayed,
        fk: firstKills[player.subject],
        fd: firstDeaths[player.subject],
        clutch: Object.values(clutches[player.subject]).reduce(
          (prev, cur) => prev + cur,
          0
        ),
        clutchv1: clutches[player.subject]["1v1"],
        clutchv2: clutches[player.subject]["1v2"],
        clutchv3: clutches[player.subject]["1v3"],
        clutchv4: clutches[player.subject]["1v4"],
        clutchv5: clutches[player.subject]["1v5"],
        kast: 0,
      });
    });

    setMatchTableData(matchTableData);
  }, [match]);

  const handleClickHeader = (key: TableHeaderKey) => {
    setSortBy((prev) => {
      if (key === prev.key) {
        return {
          key: key,
          direction:
            prev.direction === "Ascending" ? "Descending" : "Ascending",
        };
      }
      return { key: key, direction: "Ascending" };
    });
  };

  if (matchTableData === undefined) {
    return <div>Loading...</div>;
  }

  const filteredHeaders = Object.keys(matchTableData[0]).filter(
    (key) => tableHeaders[key as TableHeaderKey].display !== false
  );

  const sortedData = sortData<PlayerData>(
    matchTableData,
    sortBy.key,
    sortBy.direction
  );

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.table,
          gridTemplateColumns: Object.values(tableHeaders)
            .filter((header) => header.display === true)
            .flatMap((header) => header.width)
            .join(" "),
        }}
      >
        {/* Headers */}
        {filteredHeaders.map((key) => (
          <div
            key={key}
            style={{
              ...styles.tableItem,
              ...styles.tableHeader,
            }}
            onClick={() => handleClickHeader(key as TableHeaderKey)}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div style={{ width: "12px" }} />
              {tableHeaders[key as TableHeaderKey].name}
              {sortBy.key === key ? (
                sortBy.direction === "Ascending" ? (
                  <div style={{ width: "12px" }}>&#9650;</div>
                ) : (
                  <div style={{ width: "12px" }}>&#9660;</div>
                )
              ) : (
                <div style={{ width: "12px" }} />
              )}
            </div>
          </div>
        ))}

        {/* Data */}
        {sortedData.map((player) => (
          <div style={{ display: "contents" }}>
            {Object.entries(player).map(([key, val]) => {
              if (tableHeaders[key as TableHeaderKey].display === false) {
                return;
              }

              if (key === "rank") {
                return (
                  <div
                    key={`${player.id}${key}${val}`}
                    style={{
                      ...styles.tableItem,
                      background:
                        player.team === "Blue"
                          ? gradients.blueTeamBackground
                          : gradients.redTeamBackground,
                    }}
                  >
                    <RankIcon rankNumber={val} />
                  </div>
                );
              }

              if (key === "agent") {
                return (
                  <div
                    key={`${player.id}${key}${val}`}
                    style={{
                      ...styles.tableItem,
                      background:
                        player.team === "Blue"
                          ? gradients.blueTeamBackground
                          : gradients.redTeamBackground,
                    }}
                  >
                    <AgentIcon agentId={val} />
                  </div>
                );
              }

              if (typeof val === "number") {
                return (
                  <div
                    key={`${player.id}${key}${val}`}
                    style={{
                      ...styles.tableItem,
                      color: colors.white,
                      background:
                        player.team === "Blue"
                          ? gradients.blueTeamBackground
                          : gradients.redTeamBackground,
                    }}
                  >
                    {val.toFixed(0)}
                  </div>
                );
              }

              return (
                <div
                  key={`${player.id}${key}${val}`}
                  style={{
                    ...styles.tableItem,
                    color: colors.white,
                    background:
                      player.team === "Blue"
                        ? gradients.blueTeamBackground
                        : gradients.redTeamBackground,
                  }}
                >
                  {val}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
