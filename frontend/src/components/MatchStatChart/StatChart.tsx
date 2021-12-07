import { TSC_MATCHES } from "./sampleMatchList";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import React, { useEffect, useState } from "react";
import type { Player } from "../../types/match";
import { calculateAgentPerformance } from "../../util/stats/agentPerformance";

const VINSON_ID = "fa518d3e-8182-58ee-ac1f-70708f62816b";

interface DataPoint {
  x: number;
  y: number;
}

export const StatChart = () => {
  const [playerList, setPlayerList] = useState<Partial<Player>[]>([]);
  const [stats, setStats] = useState<Player[]>();

  const getCombatScore = (player: Player) => {
    return player.stats.score / player.stats.roundsPlayed;
  };

  useEffect(() => {
    const players = Object.values(TSC_MATCHES).flatMap((match) =>
      match.data.players.map((player) => ({
        gameName: player.gameName,
        subject: player.subject,
        tagLine: player.tagLine,
      }))
    );

    const uniquePlayers = Array.from(new Set(players));

    setPlayerList(uniquePlayers);
  }, [TSC_MATCHES]);

  console.log(playerList);

  useEffect(() => {
    const playerStats = Object.values(TSC_MATCHES).flatMap((match) => {
      const data = match.data.players.find((p) => p.subject === VINSON_ID);
      if (data !== undefined) {
        return data;
      }

      return [];
    });

    setStats(playerStats);
  }, []);

  console.log(stats);

  return (
    <div>
      {stats && (
        <VictoryChart
          theme={VictoryTheme.material}
          width={1000}
          height={600}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return `${Math.round(datum.y as number)}`;
              }}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            domain={{ x: [0, stats.length], y: [0, 500] }}
            data={stats.map((s, i) => ({ x: i, y: getCombatScore(s) }))}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      )}
    </div>
  );
};
