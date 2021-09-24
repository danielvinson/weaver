import { AgentIcon } from "../AgentIcon";
import { PlayerName } from "../PlayerName";
import { RankIcon } from "../RankIcon";
import { colors } from "../../util/colorPalette";
import type { AgentId } from "../AgentIcon";
import type { PlayerData } from "./MatchTable";
import type { RankNumber } from "../RankIcon";
import type { ReactNode } from "react";

type Key = keyof PlayerData;
type Value = PlayerData[Key];

interface TableCellProps {
  readonly dataKey: Key;
  readonly index: number;
  readonly value: Value;
  readonly player: PlayerData;
}

const renderMatchCell = (
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
    case "rank": {
      return <RankIcon rankNumber={val as RankNumber} />;
    }
    case "kast": {
      return `${Math.round(val as number)}%`
    }
    case "hsPercentBullet": {
      return (val as number).toFixed(2) + "%"
    }
    case "hsPercentKill": {
      return (val as number).toFixed(2) + "%"
    }
    default:
      return typeof val === "number" ? val.toFixed(0) : val;
  }
};

export const MatchTableCell = ({
  dataKey,
  index,
  player,
  value,
}: TableCellProps) => {
  const teamIsBlue = player.team === "Blue";
  const isFirstElement = index === 0;
  const borderLeftStyle =
    isFirstElement && teamIsBlue
      ? `5px solid ${colors.blueTeamDarker1}`
      : isFirstElement && !teamIsBlue
      ? `5px solid ${colors.redTeamDarker1}`
      : "none";

  return (
    <div
      key={`${player.id}${dataKey}`}
      style={{
        alignItems: "center",
        borderLeft: borderLeftStyle,
        color: colors.white,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "4px",
        background: colors.shadow,
      }}
    >
      {renderMatchCell(dataKey, index, value, player)}
    </div>
  );
};
