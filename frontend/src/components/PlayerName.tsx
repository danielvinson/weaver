import { colors, makeAlpha } from "../util/colorPalette";
import { useState } from "react";
import type { CSSProperties} from "react";

const styles: Record<string, CSSProperties> = {
  name: {},
  tooltip: {
    background: colors.background,
    border: `1px solid ${makeAlpha(colors.gold, 0.2)}`,
    borderRadius: "4px",
    boxShadow: "2px 2px 1px rgba(0,0,0,0.4)",

    color: colors.primary,
    fontFamily: "LatoBlack",
    fontSize: "0.7em",
    padding: "10px",
    position: "absolute",
    right: "-110px",
    top: "-35px",
  },
};

interface Props {
  readonly name: string;
  readonly tag: string;
}

export const PlayerName = ({ name, tag }: Props) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleTooltip = (newState: boolean) => {
    setShowTooltip(newState);
  };

  return (
    <div
      onMouseEnter={() => { handleTooltip(true); }}
      onMouseLeave={() => { handleTooltip(false); }}
      style={{ position: "relative" }}
    >
      <span style={styles.name}>{name}</span>

      {showTooltip && (
        <div style={styles.tooltip}>
          {name}#{tag}
        </div>
      )}
    </div>
  );
};
