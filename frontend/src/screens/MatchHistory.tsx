import { API, episodeIds } from "../api/api";
import { MatchSummary } from "../components/MatchSummary";
import { PlayerStats } from "../components/PlayerStats";
import { ROUTES } from "../App";
import { Row } from "../components/Row";
import { colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { MatchHistoryMatch, QueueType } from "../types/match";
import type { Player } from "../types/player";

const DEFAULT_ACT_ID = episodeIds.episode3.act3;

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
  const [selectedActId, setSelectedActId] = useState<string>(DEFAULT_ACT_ID);

  console.log("Hi");

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
          selectedActId,
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
      }
    };

    void getHistory();
  }, [playerData, queue, selectedActId]);

  return (
    <>
      <div style={{ ...common.column, color: colors.white }}>
        {playerData && <PlayerStats player={playerData} />}
      </div>
      <Row>
        <select
          value={queue}
          onChange={(e) => {
            setQueue(e.target.value);
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
        <select
          style={styles.select}
          defaultValue={DEFAULT_ACT_ID}
          onChange={(e) => setSelectedActId(e.target.value)}
        >
          {Object.entries(episodeIds).map(([episodeName, acts]) => {
            return Object.entries(acts).map(([actName, actId]) => (
              <option key={actId} value={actId}>
                {episodeName}:{actName}
              </option>
            ));
          })}
        </select>
      </Row>
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
