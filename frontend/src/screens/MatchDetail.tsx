import { API } from "../api/api";
import { MatchTable } from "../components/MatchTable";
import { MatchTableSummary } from "../components/MatchTableSummary";
import { RiseLoader } from "react-spinners";
import { Spacer } from "../components/Spacer";
import { colors } from "../util/colorPalette";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Match as MatchType } from "../types/match";

interface Params {
  readonly actId: string;
  readonly matchId: string;
}

export const MatchDetail = () => {
  const { actId, matchId } = useParams<Params>();
  const [match, setMatch] = useState<MatchType>();

  // Fetch data from API - refreshes on UUID change
  useEffect(() => {
    const getMatch = async () => {
      const res = await API.getMatch(matchId, actId);

      // Filter out spectators
      const matchWithNoSpectators = {
        ...res,
        players: res.players.filter((p) => p.teamId !== "Neutral"),
      };

      setMatch(matchWithNoSpectators);
    };

    void getMatch();
  }, [matchId]);

  if (match === undefined) {
    return (
      <div style={{ marginTop: "25vh" }}>
        <RiseLoader color={colors.white} />
      </div>
    );
  }

  return (
    <div>
      <MatchTableSummary match={match} />
      <Spacer height="10px" />
      <MatchTable match={match} />
    </div>
  );
};
