import { AgentIcon } from "../AgentIcon";
import { PlayerName } from "../PlayerName";
import { colorScales, colors } from "../../util/colorPalette";
import { normalizeRange } from "../../util/normalizeRange";
import type { AgentId } from "../AgentIcon";
import type { ReactNode } from "react";
import type { TournamentPlayerData } from "./types";

type Key = keyof TournamentPlayerData;
type Value = TournamentPlayerData[Key];

interface TableCellProps {
  readonly dataKey: Key;
  readonly index: number;
  readonly value: Value;
  readonly player: TournamentPlayerData;
}

export const renderTournamentTableCell = (
  dataKey: Key,
  index: number,
  val: Value,
  player: TournamentPlayerData
): ReactNode => {
  switch (dataKey) {
    case "agents":
      return (
        <>
          {(val as AgentId[]).map((agentId) => (
            <AgentIcon agentId={agentId} />
          ))}
        </>
      );
    case "name": {
      return <PlayerName name={val as string} tag={player.tag} />;
    }
    case "kast": {
      return `${Math.round(val as number)}%`;
    }
    case "hsPercent": {
      return (val as number).toFixed(2) + "%";
    }
    case "fkAvg":
    case "fdAvg":
    case "assistsAvg":
    case "deathsAvg":
    case "killsAvg": {
      return (val as number).toFixed(2);
    }
    case "fkDiff": {
      const num = val as number;
      const isPositive = num > 0;
      const normalizedDiff = 9 - normalizeRange(num, -50, 50, 0, 9);

      return (
        <span style={{ color: colorScales.greenToRed[normalizedDiff] }}>
          {isPositive && "+"}
          {num.toFixed(0)}
        </span>
      );
    }
    default:
      return typeof val === "number" ? val.toFixed(0) : <div />;
  }
};

export const TournamentTableCell = ({
  dataKey,
  index,
  player,
  value,
}: TableCellProps) => {
  return (
    <div
      key={`${player.id}${dataKey}`}
      style={{
        alignItems: "center",
        background: colors.shadow,
        color: colors.white,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "4px",
      }}
    >
      {renderTournamentTableCell(dataKey, index, value, player)}
    </div>
  );
};
