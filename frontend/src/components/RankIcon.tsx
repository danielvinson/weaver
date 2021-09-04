/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bronze1 from "../assets/icons/bronze1.svg";
import bronze2 from "../assets/icons/bronze2.svg";
import bronze3 from "../assets/icons/bronze3.svg";
import diamond1 from "../assets/icons/diamond1.svg";
import diamond2 from "../assets/icons/diamond2.svg";
import diamond3 from "../assets/icons/diamond3.svg";
import gold1 from "../assets/icons/gold1.svg";
import gold2 from "../assets/icons/gold2.svg";
import gold3 from "../assets/icons/gold3.svg";
import immortal from "../assets/icons/immortal.svg";
import iron1 from "../assets/icons/iron1.svg";
import iron2 from "../assets/icons/iron2.svg";
import iron3 from "../assets/icons/iron3.svg";
import platinum1 from "../assets/icons/platinum1.svg";
import platinum2 from "../assets/icons/platinum2.svg";
import platinum3 from "../assets/icons/platinum3.svg";
import radiant from "../assets/icons/radiant.svg";
import silver1 from "../assets/icons/silver1.svg";
import silver2 from "../assets/icons/silver2.svg";
import silver3 from "../assets/icons/silver3.svg";

export const ranks = {
  3: iron1,
  4: iron2,
  5: iron3,
  6: bronze1,
  7: bronze2,
  8: bronze3,
  9: silver1,
  10: silver2,
  11: silver3,
  12: gold1,
  13: gold2,
  14: gold3,
  15: platinum1,
  16: platinum2,
  17: platinum3,
  18: diamond1,
  19: diamond2,
  20: diamond3,
  21: immortal,
  22: radiant,
};

export type RankNumber = keyof typeof ranks;

interface Props {
  readonly rankNumber: RankNumber;
  readonly width?: number;
  readonly height?: number;
}

export const RankIcon = ({ height = 35, rankNumber, width = 35 }: Props) => (
  <div
    style={{
      alignItems: "flex-end",
      background:
        "radial-gradient(rgba(245, 205, 149, 0.4), rgba(245, 205, 149, 0.2), rgba(245, 205, 149,0.1)), rgba(0,0,0,1)",
      border: `1px solid rgba(245, 205, 149, 0.5)`,
      borderRadius: "5px / 45px",
      boxShadow:
        "inset 2px 2px 4px rgba(0,0,0,0.8), 0px 0px 2px rgba(0,0,0,0.5)",

      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    <img
      src={ranks[rankNumber]}
      width={width}
      height={height}
      alt={ranks[rankNumber]}
    />
  </div>
);
