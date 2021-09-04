/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Ascent from "../assets/images/ascent.jpeg";
import Bind from "../assets/images/bind.jpeg";
import Breeze from "../assets/images/breeze.jpeg";
import Haven from "../assets/images/haven.jpeg";
import Icebox from "../assets/images/icebox.png";
import Split from "../assets/images/split.jpeg";

export const maps = {
  ascent: Ascent,
  bind: Bind,
  breeze: Breeze,
  haven: Haven,
  icebox: Icebox,
  port: Icebox,
  split: Split, // dev name
};

export type MapName = keyof typeof maps;

interface Props {
  readonly mapName: MapName;
  readonly width?: number;
  readonly height?: number;
}

export const MapIcon = ({ height = 100, mapName, width = 200 }: Props) => {
  if (!(mapName in maps)) {
    console.log(mapName);
  }
  return (
    <div>
      <img
        src={maps[mapName]}
        width={width}
        height={height}
        alt={maps[mapName]}
      />
    </div>
  );
};
