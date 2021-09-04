import { ROUTES } from "../App";
import { common } from "../util/styles";
import { generatePath, useHistory } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  input: {
    padding: "5px",
    width: "600px",
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
    <div style={{ ...common.row, alignItems: "center" }}>
      <input
        type="text"
        style={styles.input}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={option === "player" ? "Player UUID" : "Match UUID"}
      />
      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value="player">Player</option>
        <option value="match">Match</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
