/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Ascent from "../assets/images/ascent.jpeg";
import Bind from "../assets/images/bind.jpeg";
import Breeze from "../assets/images/breeze.jpeg";
import Fracture from "../assets/images/fracture.jpeg";
import Haven from "../assets/images/haven.jpeg";
import Icebox from "../assets/images/icebox.png";
import Split from "../assets/images/split.jpeg";
import type { MapName } from "../types/match";

export const mapImages: Record<MapName, string> = {
  ascent: Ascent,
  bind: Bind,
  breeze: Breeze,
  fracture: Fracture,
  haven: Haven,
  icebox: Icebox,
  // port: Icebox,
  split: Split,
};

export type MapImageName = keyof typeof mapImages;

interface Props {
  readonly mapName: MapName;
  readonly width?: number;
  readonly height?: number;
}

export const MapIcon = ({ height = 100, mapName, width = 200 }: Props) => {
  if (!(mapName in mapImages)) {
    console.log(mapName);
  }
  return (
    <div>
      <img
        src={mapImages[mapName]}
        width={width}
        height={height}
        alt={mapImages[mapName]}
      />
    </div>
  );
};
