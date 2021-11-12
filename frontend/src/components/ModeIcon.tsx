import Competitive from "../assets/images/competitive.png";
import Deathmatch from "../assets/images/deathmatch.png";
import Escalation from "../assets/images/escalation.png";
import Replication from "../assets/images/replication.png";
import SpikeRush from "../assets/images/spike-rush.png";
import Unrated from "../assets/images/unrated.png";
import type { QueueType } from "../types/match";

export const modeImages: Record<QueueType, string> = {
  "": Unrated,
  competitive: Competitive,
  custom: Unrated,
  deathmatch: Deathmatch,
  gungame: Escalation,
  newmap: Unrated,
  onefa: Replication,
  spikerush: SpikeRush,
  unrated: Unrated,
};

interface Props {
  readonly mode: QueueType;
  readonly width?: number;
  readonly height?: number;
}

export const ModeIcon = ({ height = 35, mode, width = 35 }: Props) => (
  <div
    style={{
      alignItems: "flex-end",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <img
      src={modeImages[mode]}
      width={width}
      height={height}
      alt={modeImages[mode]}
    />
  </div>
);
