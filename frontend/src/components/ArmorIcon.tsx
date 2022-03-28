/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Heavy from "../assets/images/heavy-shields.png";
import Light from "../assets/images/light-shields.png";

export const armors = {
  "4DEC83D5-4902-9AB3-BED6-A7A390761157": Light,
  "822BCAB2-40A2-324E-C137-E09195AD7692": Heavy,
};

export type ArmorId = keyof typeof armors;

interface Props {
  readonly armorId: ArmorId;
  readonly width?: number;
  readonly height?: number;
}

export const ArmorIcon = ({ armorId, height = 20, width = 20 }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        padding: "4px",
      }}
    >
      <img
        src={armors[armorId]}
        width={width}
        height={height}
        alt={armors[armorId]}
      />
    </div>
  );
};
