import { CSSProperties, useEffect, useState } from "react";
import { matchHistoryApi } from "../api/api";
import { MatchHistoryMatch } from "../types/match";
import { useParams } from "react-router-dom";
import { MatchSummary } from "../components/MatchSummary";
import { DefaultLayout } from "../layouts/DefaultLayout";

const styles: Record<string, CSSProperties> = {
  matches: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

interface Params {
  readonly playerId: string;
}

export const MatchHistory = () => {
  const { playerId } = useParams<Params>();
  const [matchHistory, setMatchHistory] = useState<MatchHistoryMatch[]>();

  useEffect(() => {
    matchHistoryApi.get(playerId).then((res) => {
      setMatchHistory(res.data);
    });
  }, [playerId]);

  return (
    <DefaultLayout>
      Match History
      <div style={styles.matches}>
        {matchHistory?.map((match) => (
          <div>
            <MatchSummary match={match} />
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};
