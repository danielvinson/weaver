import { API } from "../api/api";
import { MatchSummary } from "../components/MatchSummary";
import { PlayerName } from "../components/PlayerName";
import { ROUTES } from "../App";
import { RankIcon } from "../components/RankIcon";
import { Row } from "../components/Row";
import { colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { MatchHistoryMatch } from "../types/match";
import type { Player } from "../types/player";
import type { RankNumber } from "../components/RankIcon";
import { Spacer } from "../components/Spacer";

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
        const historyResponse = await API.getMatchHistory(playerData.id, [
          "competitive",
        ]);
        setMatchHistory(historyResponse.data);
      }
    };

    void getHistory();
  }, [playerData]);

  return (
    <>
      <div style={{ ...common.column, color: colors.white }}>
        <Row>
          {playerData && (
            <>
              <span>Name: </span>
              <PlayerName name={playerData.name} tag={playerData.tag} />
              <Spacer width="15px" />
              <span>Rank:</span>
              <RankIcon
                rankNumber={playerData.rank as RankNumber}
                width={25}
                height={25}
              />
              <Spacer width="15px" />
              <span>RR: </span>
              <span>{playerData.rankedRating}</span>
            </>
          )}
        </Row>
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
