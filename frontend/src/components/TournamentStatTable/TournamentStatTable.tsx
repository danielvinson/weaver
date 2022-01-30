/* eslint-disable functional/immutable-data */

import { SortableTable } from "../SortableTable";
import { TournamentTableCell } from "./TournamentTableCell";
import { aggregatePlayerData } from "./aggregatePlayerData";
import { calculateMatchStats } from "./calculateMatchStats";
import { defaultTableHeaders } from "./tableHeaders";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import type { AggregateStats, PlayerData } from "./types";
import type { Match } from "../../types/match";
import type { TableHeader } from "../SortableTable";

interface Props {
  readonly matches: Match[];
}

export const TournamentStatTable = ({ matches }: Props) => {
  const [aggregateStats, setAggregateStats] = useState<AggregateStats>();
  const [averagedStats, setAveragedStats] = useState<PlayerData[]>();
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(
    defaultTableHeaders.map((th, index) => ({ ...th, order: index }))
  );

  // Calculate data and build table
  useEffect(() => {
    const matchStats = matches.flatMap(calculateMatchStats);
    console.log(matchStats);
    const stats = aggregatePlayerData(matchStats);
    console.log(stats);
    setAggregateStats(stats);

    const sumValues = (values: number[]) => {
      return values.reduce((prev, cur) => prev + cur, 0);
    };

    const averageValues = (values: number[]) => {
      return sumValues(values) / values.length;
    };

    const averagedStatData = Object.values(stats).map((playerStats) => ({
      ...playerStats,
      agent: playerStats.agent[0],
      agentWeightedAcs: averageValues(playerStats.agentWeightedAcs),
      agentWeightedWrwcs: averageValues(playerStats.agentWeightedWrwcs),
      assists: sumValues(playerStats.assists),
      clutch: sumValues(playerStats.clutch),
      clutchv1: sumValues(playerStats.clutchv1),
      clutchv2: sumValues(playerStats.clutchv2),
      clutchv3: sumValues(playerStats.clutchv3),
      clutchv4: sumValues(playerStats.clutchv4),
      clutchv5: sumValues(playerStats.clutchv5),
      combat: averageValues(playerStats.combat),
      deaths: sumValues(playerStats.deaths),
      fd: sumValues(playerStats.fd),
      fk: sumValues(playerStats.fk),
      hsPercent: averageValues(playerStats.hsPercent),
      kast: averageValues(playerStats.kast),
      kills: sumValues(playerStats.kills),
      multiKills1: sumValues(playerStats.multiKills1),
      multiKills2: sumValues(playerStats.multiKills2),
      multiKills3: sumValues(playerStats.multiKills3),
      multiKills4: sumValues(playerStats.multiKills4),
      multiKills5: sumValues(playerStats.multiKills5),
      rws: averageValues(playerStats.rws),
      wrws: averageValues(playerStats.wrws),
    }));

    console.log(averagedStatData);

    setAveragedStats(averagedStatData);
  }, []);

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

  return (
    <div>
      <SortableTable<PlayerData>
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
  );
};
