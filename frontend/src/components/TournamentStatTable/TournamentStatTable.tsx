/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { MatchTableSettings } from "../MatchTable/MatchTableSettings";
import { SortableTable } from "../SortableTable";
import { Spacer } from "../Spacer";
import { TournamentTableCell } from "./TournamentTableCell";
import { agents } from "../AgentIcon";
import { aggregatePlayerData } from "./aggregatePlayerData";
import { calculateMatchStats } from "./calculateMatchStats";
import { colors } from "../../util/colorPalette";
import { common } from "../../util/styles";
import { content } from "../../api/content";
import { defaultTableHeaders } from "./tableHeaders";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import type { AgentId } from "../AgentIcon";
import type { AggregateStats, TournamentPlayerData } from "./types";
import type { CSSProperties } from "react";
import type { MapNameUnion, Match } from "../../types/match";
import type { Setting } from "../MatchTable/MatchTableSettings";
import type { TableHeader } from "../SortableTable";

interface Props {
  readonly matches: Match[];
}

interface Filters {
  readonly agent: AgentId | "none";
  readonly map: MapNameUnion | "none";
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

export const TournamentStatTable = ({ matches }: Props) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [aggregateStats, setAggregateStats] = useState<AggregateStats>();
  const [averagedStats, setAveragedStats] = useState<TournamentPlayerData[]>();
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(
    defaultTableHeaders.map((th, index) => ({ ...th, order: index }))
  );

  // Filters
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    agent: "none",
    map: "none",
  });

  // Calculate data and build table
  useEffect(() => {
    const filteredMapMatches =
      selectedFilters.map !== "none"
        ? matches.filter((m) => m.map === selectedFilters.map)
        : matches;
    const matchStats = filteredMapMatches.flatMap(calculateMatchStats);
    const filteredAgentStats =
      selectedFilters.agent !== "none"
        ? matchStats.filter((s) => s.agent === selectedFilters.agent)
        : matchStats;
    const stats = aggregatePlayerData(filteredAgentStats);
    setAggregateStats(stats);

    const sumValues = (values: number[]) => {
      return values.reduce((prev, cur) => prev + cur, 0);
    };

    const averageValues = (values: number[]) => {
      return sumValues(values) / values.length;
    };

    const averagedStatData = Object.values(stats).map((playerStats) => ({
      agentWeightedAcs: averageValues(playerStats.agentWeightedAcs),
      agentWeightedWrwcs: averageValues(playerStats.agentWeightedWrwcs),
      agents: playerStats.agent,
      assistsAvg: averageValues(playerStats.assists),
      assistsTotal: sumValues(playerStats.assists),
      clutch: sumValues(playerStats.clutch),
      clutchv1: sumValues(playerStats.clutchv1),
      clutchv2: sumValues(playerStats.clutchv2),
      clutchv3: sumValues(playerStats.clutchv3),
      clutchv4: sumValues(playerStats.clutchv4),
      clutchv5: sumValues(playerStats.clutchv5),
      combat: averageValues(playerStats.combat),
      deathsAvg: averageValues(playerStats.deaths),
      deathsTotal: sumValues(playerStats.deaths),
      defuses: sumValues(playerStats.defuses),
      fdAvg: averageValues(playerStats.fd),
      fdTotal: sumValues(playerStats.fd),
      fkAvg: averageValues(playerStats.fk),
      fkTotal: sumValues(playerStats.fk),
      gamesPlayed: playerStats.agent.length,
      hsPercent: averageValues(playerStats.hsPercent),
      id: playerStats.id,
      kast: averageValues(playerStats.kast),
      killsAvg: averageValues(playerStats.kills),
      killsTotal: sumValues(playerStats.kills),
      multiKills1: sumValues(playerStats.multiKills1),
      multiKills2: sumValues(playerStats.multiKills2),
      multiKills3: sumValues(playerStats.multiKills3),
      multiKills4: sumValues(playerStats.multiKills4),
      multiKills5: sumValues(playerStats.multiKills5),
      multiKillsAvg:
        sumValues([
          ...playerStats.multiKills2,
          ...playerStats.multiKills3,
          ...playerStats.multiKills4,
          ...playerStats.multiKills5,
        ]) / playerStats.multiKills2.length,
      multiKillsTotal: sumValues([
        ...playerStats.multiKills2,
        ...playerStats.multiKills3,
        ...playerStats.multiKills4,
        ...playerStats.multiKills5,
      ]),
      name: playerStats.name,
      plants: sumValues(playerStats.plants),
      rws: averageValues(playerStats.rws),
      tag: playerStats.tag,
      wrws: averageValues(playerStats.wrws),
    }));

    setAveragedStats(averagedStatData);
  }, [selectedFilters]);

  if (aggregateStats === undefined || averagedStats === undefined) {
    return <div>"Loading..."</div>;
  }

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

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleChangeFilter = (
    filterType: keyof Filters,
    newValue: AgentId | string
  ) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: newValue,
    });
  };

  return (
    <div>
      <div
        style={{
          ...common.row,
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "10px",
          paddingTop: "10px",
          width: "90vw",
        }}
      >
        <div style={{ ...common.row }}>
          <div style={{ ...common.row, alignItems: "center" }}>
            <span style={{ color: colors.white, paddingRight: "10px" }}>
              Map
            </span>
            <select
              value={selectedFilters.map}
              onChange={(e) => {
                handleChangeFilter("map", e.target.value);
              }}
              style={styles.select}
              defaultValue={undefined}
            >
              <option value="none">None</option>
              <option value="ascent">Ascent</option>
              <option value="bind">Bind</option>
              <option value="haven">Haven</option>
              <option value="split">Split</option>
            </select>
          </div>
          <Spacer width="35px" />
          <div style={{ ...common.row, alignItems: "center" }}>
            <span style={{ color: colors.white, paddingRight: "10px" }}>
              Agent
            </span>
            <select
              value={selectedFilters.agent}
              onChange={(e) => {
                handleChangeFilter("agent", e.target.value);
              }}
              style={styles.select}
              defaultValue={undefined}
            >
              <option value="none">None</option>
              {Object.keys(agents).map((agentId) => (
                <option value={agentId}>
                  {
                    content.agents.find((a) => a.id.toLowerCase() === agentId)
                      ?.name
                  }
                </option>
              ))}
            </select>
          </div>
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
            <Modal
              shouldCloseOnOverlayClick={true}
              isOpen={settingsOpen}
              onRequestClose={() => handleSettingsClick()}
              style={{
                content: {
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  borderRadius: 0,
                  display: "flex",
                  flexDirection: "row",
                  height: "auto",
                  inset: 0,
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                  position: "relative",
                  width: "auto",
                },
                overlay: {
                  alignItems: "center",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                },
              }}
            >
              <MatchTableSettings
                onChangeSetting={handleChangeSetting}
                settings={tableHeaders.map<Setting>((th) => ({
                  group: th.group,
                  key: th.key,
                  name: th.name,
                  value: th.display,
                }))}
              />
            </Modal>
          )}
        </div>
      </div>
      <div style={{ width: "90vw" }}>
        <SortableTable<TournamentPlayerData>
          headers={tableHeaders}
          data={averagedStats}
          defaultSort={{
            direction: "Descending",
            key: "combat",
          }}
          renderCell={(key, index, val, item) => (
            <TournamentTableCell
              dataKey={key}
              index={index}
              value={val}
              player={item}
            />
          )}
        />
      </div>
    </div>
  );
};
