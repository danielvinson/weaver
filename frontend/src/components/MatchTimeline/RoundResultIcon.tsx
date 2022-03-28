import { ReactComponent as Defuse } from "../../assets/icons/defuse.svg";
import { ReactComponent as Detonate } from "../../assets/icons/detonate.svg";
import { ReactComponent as Elimination } from "../../assets/icons/elimination.svg";
import { colors } from "../../util/colorPalette";

export type RoundResultCode = "Defuse" | "Detonate" | "Elimination";
interface Props {
  readonly winningTeam: "Blue" | "Red";
  readonly resultCode: RoundResultCode;
}

export const RoundResultIcon = ({ resultCode, winningTeam }: Props) => {
  const winningTeamColor =
    winningTeam === "Blue" ? colors.blueTeamDarker1 : colors.redTeamDarker1;
  switch (resultCode) {
    case "Defuse":
      return (
        <div style={{ color: winningTeamColor }}>
          <Defuse width={20} height={20} />
        </div>
      );
    case "Detonate":
      return (
        <div style={{ color: winningTeamColor }}>
          <Detonate width={20} height={20} />
        </div>
      );
    case "Elimination":
      return (
        <div style={{ color: winningTeamColor }}>
          <Elimination width={20} height={20} />
        </div>
      );
    default:
      throw new Error("invalid round result code");
  }
};
