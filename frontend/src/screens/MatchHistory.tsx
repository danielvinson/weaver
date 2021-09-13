import { API } from "../api/api";
import { MatchSummary } from "../components/MatchSummary";
import { RankIcon } from "../components/RankIcon";
import { colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import type { MatchHistoryMatch } from "../types/match";
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
  const { playerId, playerName, playerTag } = useParams<Params>();
  const [matchHistory, setMatchHistory] =
    useState<readonly MatchHistoryMatch[]>();
  const [playerData, setPlayerData] = useState<Player>();

  // This API is stupid and requires playerName and playerTag instead of an id...
  useEffect(() => {
    const getPlayer = async () => {
      const player = await API.getPlayer(playerName, playerTag);
      setPlayerData(player.data);
    };

    void getPlayer();
  }, [playerId]);

  useEffect(() => {
    const getHistory = async () => {
      const history = await API.getMatchHistory(playerId, ["competitive"]);
      setMatchHistory(history.data);
    };

    void getHistory();
  }, [playerId]);

  return (
    <>
      <div style={{ ...common.column, color: colors.white }}>
        <div style={{ ...common.row }}>
          <span>
            Player: {playerData?.name} {playerData?.tag}
          </span>
        </div>
        <div style={{ ...common.row }}>
          <span>Rank:</span>
          {playerData && (
            <RankIcon
              rankNumber={playerData.rank as RankNumber}
              width={60}
              height={60}
            />
          )}
        </div>
      </div>
      <div style={styles.matches}>
        {matchHistory?.map((match) => (
          <div>
            <MatchSummary match={match} />
          </div>
        ))}
      </div>
    </>
  );
};
