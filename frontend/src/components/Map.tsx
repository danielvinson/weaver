import Haven from "../assets/haven.jpeg";
import Breeze from "../assets/breeze.jpeg";
import Bind from "../assets/bind.jpeg";
import Ascent from "../assets/ascent.jpeg";
import Icebox from "../assets/icebox.png";
import Split from "../assets/split.jpeg";

export const maps = {
  haven: Haven,
  breeze: Breeze,
  bind: Bind,
  ascent: Ascent,
  icebox: Icebox,
  split: Split,
  port: Icebox, // dev name
};

export type MapName = keyof typeof maps;

interface Props {
  readonly mapName: MapName;
  readonly width?: number;
  readonly height?: number;
}

export const MapIcon = ({ mapName, width = 200, height = 100 }: Props) => {
  if (!(mapName in maps)) {
    console.log(mapName);
  }
  return (
    <div>
      <img
        src={maps[mapName]}
        width={width}
        height={height}
        alt={`${maps[mapName]}`}
      />
    </div>
  );
};
