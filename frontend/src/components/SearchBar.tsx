import "../normalize.css";
import { ROUTES } from "../App";
import { Spacer } from "./Spacer";
import { colors, gradients } from "../util/colorPalette";
import { common } from "../util/styles";
import { generatePath, useHistory } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";

const TEXT_SIZE = "1em";
const SEARCHBAR_HEIGHT = "40px";

const styles: Record<string, CSSProperties> = {
  button: {
    background: colors.shadow,
    color: colors.white,
    cursor: "pointer",
    fontSize: TEXT_SIZE,

    height: SEARCHBAR_HEIGHT,
    paddingLeft: "15px",
    paddingRight: "15px",

    ...common.row,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    ...common.row,
    alignItems: "flex-end",
    background: gradients.inputBackground,

    boxShadow: "1px 1px 4px rgba(0,0,0,0.5)",
    justifyContent: "space-between",
    paddingBottom: "2px",
  },
  input: {
    background: colors.shadow,
    color: colors.white,

    fontFamily: "monospace",
    fontSize: TEXT_SIZE,
    height: SEARCHBAR_HEIGHT,
    padding: "10px",
    width: "400px",
  },
  label: {
    ...common.column,
    color: "white",
    fontSize: "0.7em",
  },
  select: {
    background: colors.shadow,
    color: colors.white,
    fontSize: TEXT_SIZE,
    height: SEARCHBAR_HEIGHT,
    paddingLeft: "5px",
    paddingRight: "5px",
  },
};

export const SearchBar = () => {
  const history = useHistory();
  const [inputText, setInputText] = useState<string>("");
  const [option, setOption] = useState<string>("");

  const handleSearch = () => {
    if (inputText === "") {
      return;
    }

    const linkLocation =
      option === "player"
        ? generatePath(ROUTES.history.path, { playerId: inputText })
        : generatePath(ROUTES.detail.path, { matchId: inputText });

    history.push(linkLocation);
  };

  return (
    <div style={styles.container}>
      <select
        value={option}
        onChange={(e) => setOption(e.target.value)}
        style={styles.select}
      >
        <option value="player">Player</option>
        <option value="match">Match</option>
      </select>
      <input
        type="text"
        style={styles.input}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={option === "player" ? "Player UUID" : "Match UUID"}
        className="searchInput"
      />

      <div onClick={handleSearch} style={styles.button}>
        Search{<Spacer width="10px" />}&#10148;
      </div>
    </div>
  );
};
