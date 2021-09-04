import { API } from "../api/api";
import { MatchSummary } from "../components/MatchSummary";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CSSProperties} from "react";
import type { MatchHistoryMatch } from "../types/match";

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
}

export const MatchHistory = () => {
  const { playerId } = useParams<Params>();
  const [matchHistory, setMatchHistory] = useState<readonly MatchHistoryMatch[]>();

  useEffect(() => {
    const getHistory = async () => {
      const history = await API.getMatchHistory(playerId)
      setMatchHistory(history.data);
    }

    void getHistory();
  }, [playerId]);

  return (
    <>
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
