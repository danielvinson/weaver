import { CSSProperties } from "react";
import { colors } from "../util/colorPalette";

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100vw",
    height: "30px",
    backgroundColor: colors.primary,
  },
};

export const Header = () => {
  return <div style={styles.container}></div>;
};
