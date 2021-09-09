import { colorScales, colors } from "../util/colorPalette";
import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  checkbox: {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    boxShadow: "inset 1px 1px 3px rgba(0,0,0,.4)",
    cursor: "pointer",
    height: "20px",
    transition: "background 0.3s",
    width: "40px",
  },
  checkboxContainer: {
    height: "25px",
    paddingTop: "2px",
    position: "relative",
    width: "40px",
  },
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  knob: {
    alignItems: "center",
    background: "radial-gradient(rgba(255,255,255,1), rgba(210,220,210,1))",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "11px",
    boxShadow: "1px 1px 1px rgba(0,0,0,0.8)",
    color: colors.background,
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    fontSize: "0.7em",
    height: "22px",
    justifyContent: "center",
    left: -1,
    position: "absolute",
    top: 1,
    transition: "all 0.3s",
    width: "22px",
  },
};

interface Props {
  readonly onChange: (newValue: boolean) => void;
  readonly value: boolean;
}

export const Switch = ({ onChange, value }: Props) => {
  const handleCheckboxChange = (newValue: boolean) => {
    onChange(newValue);
  };

  return (
    <div style={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => handleCheckboxChange(e.target.checked)}
        style={{
          ...styles.checkbox,
          background: value
            ? colorScales.neutralToGreen[9]
            : colors.background,
        }}
      />
      <div
        style={{
          ...styles.knob,
          transform: value ? "translateX(20px)" : "translateX(0px)",
        }}
        onClick={() => handleCheckboxChange(!value)}
      >
        {value ? "✓" : "X"}
      </div>
    </div>
  );
};
