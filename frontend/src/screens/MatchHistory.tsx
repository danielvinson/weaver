import { API } from "../api/api";
import { MatchSummary } from "../components/MatchSummary";
import { PlayerName } from "../components/PlayerName";
import { PlayerStats } from "../components/PlayerStats";
import { ROUTES } from "../App";
import { RankIcon } from "../components/RankIcon";
import { Row } from "../components/Row";
import { Spacer } from "../components/Spacer";
import { colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { MatchHistoryMatch, QueueType } from "../types/match";
import type { Player } from "../types/player";
import type { RankNumber } from "../components/RankIcon";

const styles: Record<string, CSSProperties> = {
  matches: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

interface Params {
  readonly playerId: string;
  readonly playerName: string;
  readonly playerTag: string;
}

export const MatchHistory = () => {
  const history = useHistory();
  const { playerName, playerTag } = useParams<Params>();
  const [matchHistory, setMatchHistory] =
    useState<readonly MatchHistoryMatch[]>();
  const [playerData, setPlayerData] = useState<Player>();
  const [queue, setQueue] = useState<QueueType | "all">("all");

  // This API is stupid and requires playerName and playerTag instead of an id...
  useEffect(() => {
    const getPlayer = async () => {
      const player = await API.getPlayer(
        playerName.toLowerCase(),
        playerTag.toLowerCase()
      );
      setPlayerData(player.data);
    };

    void getPlayer();
  }, [playerName, playerTag]);

  useEffect(() => {
    const getHistory = async () => {
      if (playerData !== undefined) {
        const historyResponse = await API.getMatchHistory(
          playerData.id,
          queue === "all"
            ? [
                "competitive",
                "custom",
                "newmap",
                "onefa",
                "spikerush",
                "unrated",
                "deathmatch",
              ]
            : [queue]
        );

        setMatchHistory(historyResponse.data);
        console.log(historyResponse);
      }
    };

    void getHistory();
  }, [playerData, queue]);

  return (
    <>
      <div style={{ ...common.column, color: colors.white }}>
        {playerData && <PlayerStats player={playerData} />}
      </div>
      <div>
        <select
          value={queue}
          onChange={(e) => {
            setQueue(e.target.value as QueueType | "all");
          }}
          style={styles.select}
          defaultValue={queue}
        >
          <option value="all">All</option>
          <option value="competitive">Competitive</option>
          <option value="custom">Custom</option>
          <option value="unrated">Unrated</option>
          <option value="deathmatch">Deathmatch</option>
          <option value="spikerush">Spike Rush</option>
        </select>
      </div>
      <div style={styles.matches}>
        {matchHistory?.map((match) => (
          <div
            onClick={() =>
              history.push(
                generatePath(ROUTES.detail.path, { matchId: match.matchId })
              )
            }
            style={{ cursor: "pointer" }}
          >
            <MatchSummary match={match} />
          </div>
        ))}
      </div>
    </>
  );
};
