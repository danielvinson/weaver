/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable functional/immutable-data */
import { API } from "../api/api";
import { AgentIcon } from "./AgentIcon";
import { PlayerName } from "./PlayerName";
import { RankIcon } from "./RankIcon";
import { calculateClutches } from "../util/clutches";
import { calculateFirstDeaths } from "../util/firstDeaths";
import { calculateFirstKills } from "../util/firstKills";
import { calculateRWS } from "../util/rws";
import { colors, gradients } from "../util/colorPalette";
import { sortData } from "../util/sort";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Match as MatchType } from "../types/match";
import type { SortDirection } from "../util/sort";

interface PlayerData {
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

const styles: Record<string, CSSProperties> = {
  table: {
    border: "1px solid #222",
    borderTop: "3px solid #222",
    display: "grid",
  },
  tableHeader: {
    backgroundColor: colors.shadow,
    boxShadow: "0px 1px 1px rgba(255,255,255,0.2)",
    color: colors.white,
    cursor: "pointer",
    fontWeight: "bold",
  },
  tableItem: {
    alignItems: "center",
    borderLeft: "1px solid rgba(0,0,0,.1)",
    color: colors.white,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "4px",
  },
};

const tableHeaders = {
  agent: { display: true, name: "Agent", width: "70px" },
  assists: { display: true, name: "A", width: "50px" },
  clutch: { display: true, name: "Clutches", width: "auto" },
  clutchv1: { display: true, name: "1v1", width: "auto" },
  clutchv2: { display: true, name: "1v2", width: "auto" },
  clutchv3: { display: true, name: "1v3", width: "auto" },
  clutchv4: { display: true, name: "1v4", width: "auto" },
  clutchv5: { display: true, name: "1v5", width: "auto" },
  combat: { display: true, name: "Combat Score", width: "170px" },
  deaths: { display: true, name: "D", width: "50px" },
  fd: { display: true, key: "fd", name: "FD", width: "50px" },
  fk: { display: true, key: "fk", name: "FK", width: "50px" },
  id: { display: false, name: "ID", width: "auto" },
  kast: { display: false, name: "KAST", width: "auto" },
  kills: { display: true, name: "K", width: "50px" },
  name: { display: true, name: "Name", width: "minmax(125px, 250px)" },
  rank: { display: true, name: "Rank", width: "70px" },
  rws: { display: true, name: "RWS", width: "90px" },
  tag: { display: false, name: "Tag", width: "auto" },
  team: { display: false, name: "Team", width: "auto" },
};

type TableHeaderKey = keyof typeof tableHeaders;

interface Props {
  readonly matchId: string;
}

export const Match = ({ matchId }: Props) => {
  const [match, setMatch] = useState<MatchType>();
  const [matchTableData, setMatchTableData] = useState<readonly PlayerData[]>();
  const [sortBy, setSortBy] = useState<{
    readonly key: TableHeaderKey;
    readonly direction: SortDirection;
  }>({ direction: "Ascending", key: "combat" });

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
    console.log(clutches);
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
        const [key, val] = cur;
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

    setMatchTableData(matchTableData);
  }, [match]);

  const handleClickHeader = (key: TableHeaderKey) => {
    setSortBy((prev) => {
      if (key === prev.key) {
        return {
          direction:
            prev.direction === "Ascending" ? "Descending" : "Ascending",
          key: key,
        };
      }
      return { direction: "Ascending", key: key };
    });
  };

  if (matchTableData === undefined) {
    return <div>Loading...</div>;
  }

  const filteredHeaders = Object.keys(matchTableData[0]).filter(
    (key) => tableHeaders[key as TableHeaderKey].display
  );

  const sortedData = sortData<PlayerData>(
    matchTableData,
    sortBy.key,
    sortBy.direction
  );

  return (
    <div style={{ marginTop: "5vh", width: "90vw" }}>
      <div
        style={{
          ...styles.table,
          gridTemplateColumns: Object.values(tableHeaders)
            .filter((header) => header.display)
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
            onClick={() => {
              handleClickHeader(key as TableHeaderKey);
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
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
            {Object.entries(player)
              .filter(([key, _]) => tableHeaders[key as TableHeaderKey].display)
              .map(([key, val]) => {
                if (key === "name") {
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
                      <PlayerName name={player.name} tag={player.tag} />
                    </div>
                  );
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
                        background:
                          player.team === "Blue"
                            ? gradients.blueTeamBackground
                            : gradients.redTeamBackground,
                        color: colors.white,
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
                      background:
                        player.team === "Blue"
                          ? gradients.blueTeamBackground
                          : gradients.redTeamBackground,
                      color: colors.white,
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
