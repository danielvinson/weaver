import { LoadoutsTable } from "./LoadoutsTable";
import { colors, makeAlpha } from "../../util/colorPalette";
import type { CSSProperties } from "react";
import type { Player } from "../../types/match";
import type { Round } from "../../types/round";

const styles: Record<string, CSSProperties> = {
  closeButton: {
    color: colors.white,
    cursor: "pointer",
    fontFamily: "LatoBlack",
    fontSize: "1em",
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: `${colors.shadow}`,
    border: `1px solid ${makeAlpha(colors.gold, 0.2)}`,
    overflow: "hidden",
    padding: "15px",
    width: "90vw",
  },
  text: {
    color: colors.white,
    fontFamily: "LatoBold",
    fontSize: "1em",
  },
};

interface Props {
  readonly players: readonly Player[];
  readonly round?: Round;
  readonly onPressClose?: () => void;
}

export const RoundBreakdown = ({ onPressClose, players, round }: Props) => {
  return (
    <div style={styles.container}>
      <div style={{ position: "relative" }}>
        <div style={styles.closeButton} onClick={onPressClose}>
          X
        </div>
        <div style={styles.text}>Player Loadouts</div>
        <LoadoutsTable players={players} round={round} />
      </div>
    </div>
  );
};
