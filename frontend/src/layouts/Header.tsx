import { ROUTES } from "../App";
import { SearchBar } from "../components/SearchBar";
import { Spacer } from "../components/Spacer";
import { colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { useHistory } from "react-router";
import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  active: {
    color: colors.primary,
    fontFamily: "LatoBlack",
    fontSize: "1.2em",
    textDecoration: "none",
  },
  container: {
    ...common.row,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1vw",
    width: "100vw",
  },
  inactive: {
    color: colors.primary,
    fontFamily: "Lato",
    fontSize: "1.2em",
    textDecoration: "none",
  },
  logo: {
    color: colors.white,
    fontFamily: "LatoBold",
    fontSize: "1.8em",
    textShadow: `0.01em 0.01em 0x ${colors.highlight}`,
  },
  subTitle: {
    color: colors.white,
    fontFamily: "LatoBoldItalic",
    fontSize: "0.8em",
    textShadow: `0.01em 0.01em 0px ${colors.highlight}`,
  },
  title: {
    color: colors.primary,
    fontFamily: "LatoBoldItalic",
    fontSize: "1.2em",
    letterSpacing: "0.1em",
    textShadow: `0.01em 0.01em 0px ${colors.highlight}`,
  },
};

interface Props {
  readonly activeRoute: string;
}

export const Header = ({ activeRoute }: Props) => {
  const history = useHistory();
  const handleLogoClick = () => history.push(ROUTES.home.path);
  return (
    <div style={styles.container}>
      <div style={{ cursor: "pointer" }} onClick={handleLogoClick}>
        <span style={{ ...styles.logo, marginRight: "5px" }}>VS</span>
        <span style={styles.subTitle}>Valorant Stats</span>
      </div>

      <SearchBar />

      <Spacer />
    </div>
  );
};
