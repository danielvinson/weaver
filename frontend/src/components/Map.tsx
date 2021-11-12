/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Ascent from "../assets/images/ascent.jpeg";
import AscentLarge from "../assets/images/ascent-large.png";
import Bind from "../assets/images/bind.jpeg";
import BindLarge from "../assets/images/bind-large.png";
import Breeze from "../assets/images/breeze.jpeg";
import BreezeLarge from "../assets/images/breeze-large.png";
import Fracture from "../assets/images/fracture.jpeg";
import FractureLarge from "../assets/images/fracture-large.png";
import Haven from "../assets/images/haven.jpeg";
import HavenLarge from "../assets/images/haven-large.png";
import Icebox from "../assets/images/icebox.png";
import IceboxLarge from "../assets/images/icebox-large.png";
import Split from "../assets/images/split.jpeg";
import SplitLarge from "../assets/images/split-large.png";
import type { MapName } from "../types/match";

export const mapImages: Record<MapName, string> = {
  ascent: Ascent,
  bind: Bind,
  breeze: Breeze,
  fracture: Fracture,
  haven: Haven,
  icebox: Icebox,
  split: Split,
};

export const largeMapImages: Record<MapName, string> = {
  ascent: AscentLarge,
  bind: BindLarge,
  breeze: BreezeLarge,
  fracture: FractureLarge,
  haven: HavenLarge,
  icebox: IceboxLarge,
  split: SplitLarge,
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
