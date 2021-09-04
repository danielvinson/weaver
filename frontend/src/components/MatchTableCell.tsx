import { AgentIcon } from "./AgentIcon";
import { PlayerName } from "./PlayerName";
import { RankIcon } from "./RankIcon";
import { colors, gradients } from "../util/colorPalette";
import type { AgentId } from "./AgentIcon";
import type { PlayerData } from "./Match";
import type { RankNumber } from "./RankIcon";
import type { ReactNode } from "react";

type Key = keyof PlayerData;
type Value = PlayerData[Key];

interface TableCellProps {
  readonly dataKey: Key;
  readonly value: Value;
  readonly player: PlayerData;
}

const renderMatchCell = (
  dataKey: Key,
  val: Value,
  player: PlayerData
): ReactNode => {
  switch (dataKey) {
    case "agent":
      return <AgentIcon agentId={val as AgentId} />;
    case "name": {
      return <PlayerName name={val as string} tag={player.tag} />;
    }
    case "rank": {
      return <RankIcon rankNumber={val as RankNumber} />;
    }
    default:
      return typeof val === "number" ? val.toFixed(0) : val;
  }
};

export const MatchTableCell = ({ dataKey, player, value }: TableCellProps) => (
  <div
    key={`${player.id}${dataKey}`}
    style={{
      alignItems: "center",
      background:
        player.team === "Blue"
          ? gradients.blueTeamBackground
          : gradients.redTeamBackground,
      borderLeft: "1px solid rgba(0,0,0,.1)",
      color: colors.white,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: "4px",
    }}
  >
    {renderMatchCell(dataKey, value, player)}
  </div>
);
