import "../normalize.css";
import "./SearchBar.css";
import { ROUTES } from "../App";
import { Spacer } from "./Spacer";
import { colors, gradients } from "../util/colorPalette";
import { common } from "../util/styles";
import { episodeIds } from "../api/api";
import { generatePath, useHistory } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";

const TEXT_SIZE = "1em";
const SEARCHBAR_HEIGHT = "40px";
const DEFAULT_ACT = episodeIds.episode5.act3;

const styles: Record<string, CSSProperties> = {
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
  const [option, setOption] = useState<string>("match");
  const [errorText, setErrorText] = useState<string>();
  const [selectedActId, setSelectedActId] = useState<string>(DEFAULT_ACT);

  const handleSearch = () => {
    if (inputText === "") {
      return;
    }

    if (option === "player") {
      if (!inputText.includes("#")) {
        setErrorText("Please use format player#tag");
        return;
      }

      const [playerName, tag] = inputText.split("#");
      const linkLocation = generatePath(ROUTES.history.path, {
        playerName: playerName,
        playerTag: tag,
      });
      setErrorText(undefined);
      history.push(linkLocation);
    }

    if (option === "match") {
      const linkLocation = generatePath(ROUTES.detail.path, {
        actId: selectedActId,
        matchId: inputText,
      });
      setErrorText(undefined);
      history.push(linkLocation);
    }
  };

  const placeholderText = option === "player" ? "Player UUID" : "Match UUID";

  const episodeOptions = Object.entries(episodeIds).map(
    ([episodeName, acts]) => {
      return Object.entries(acts).map(([actName, actId]) => (
        <option key={actId} value={actId}>
          {episodeName}:{actName}
        </option>
      ));
    }
  );

  return (
    <div style={common.column}>
      <div style={styles.container}>
        <select
          value={option}
          onChange={(e) => {
            setOption(e.target.value);
            setInputText("");
          }}
          style={styles.select}
          defaultValue={option}
        >
          <option value="match">Match</option>
          <option value="player">Player</option>
        </select>
        <input
          type="text"
          style={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholderText}
          className="searchInput"
        />

        {option === "match" && (
          <div>
            <select
              style={styles.select}
              defaultValue={DEFAULT_ACT}
              onChange={(e) => setSelectedActId(e.target.value)}
            >
              {episodeOptions}
            </select>
          </div>
        )}

        <div onClick={handleSearch} className="searchButton">
          Search{<Spacer width="10px" />}&#10148;
        </div>
      </div>
      <div>
        <span style={{ color: colors.white }}>{errorText}</span>
      </div>
    </div>
  );
};
