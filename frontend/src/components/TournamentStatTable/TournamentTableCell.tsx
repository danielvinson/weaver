import { AgentIcon } from "../AgentIcon";
import { PlayerName } from "../PlayerName";
import { colors } from "../../util/colorPalette";
import type { AgentId } from "../AgentIcon";
import type { PlayerData } from "./types";
import type { ReactNode } from "react";

type Key = keyof PlayerData;
type Value = PlayerData[Key];

interface TableCellProps {
  readonly dataKey: Key;
  readonly index: number;
  readonly value: Value;
  readonly player: PlayerData;
}

export const renderTournamentTableCell = (
  dataKey: Key,
  index: number,
  val: Value,
  player: PlayerData
): ReactNode => {
  switch (dataKey) {
    case "agent":
      return <AgentIcon agentId={val as AgentId} />;
    case "name": {
      return <PlayerName name={val as string} tag={player.tag} />;
    }
    case "kast": {
      return `${Math.round(val as number)}%`;
    }
    case "hsPercent": {
      return (val as number).toFixed(2) + "%";
    }
    default:
      return typeof val === "number" ? val.toFixed(0) : val;
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
