import { API } from "../api/api";
import { MatchTable } from "../components/MatchTable";
import { MatchTableSummary } from "../components/MatchTableSummary";
import { MatchTeamStats } from "../components/MatchTeamStats/MatchTeamStats";
import { MatchTimeline } from "../components/MatchTimeline/MatchTimeline";
import { RiseLoader } from "react-spinners";
import { RoundBreakdown } from "../components/RoundBreakdown/RoundBreakdown";
import { Spacer } from "../components/Spacer";
import { colors } from "../util/colorPalette";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Match as MatchType } from "../types/match";

const styles: Record<string, CSSProperties> = {
  roundBreakdown: {
    maxHeight: "0px",
    overflow: "hidden",
    transition: "max-height 250ms ease-out 0s",
  },
  roundBreakdownExpanded: {
    maxHeight: "25em",
  },
};

interface Params {
  readonly actId: string;
  readonly matchId: string;
}

export const MatchDetail = () => {
  const { actId, matchId } = useParams<Params>();
  const [match, setMatch] = useState<MatchType>();
  const [showRoundBreakdown, setShowRoundBreakdown] = useState(false);
  const [selectedRoundNum, setSelectedRoundNum] = useState<number>();

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

  const selectedRound = match.roundResults.find(
    (rr) => rr.roundNum === selectedRoundNum
  );

  return (
    <div>
      <MatchTableSummary match={match} />
      <MatchTimeline
        match={match}
        selectedRound={selectedRoundNum}
        onSelectRound={(roundNum) => {
          if (selectedRoundNum === roundNum) {
            setShowRoundBreakdown(false);
            setTimeout(() => setSelectedRoundNum(undefined), 250);
          } else {
            setShowRoundBreakdown(true);
            setSelectedRoundNum(roundNum);
          }
        }}
      />
      <div
        style={
          showRoundBreakdown
            ? { ...styles.roundBreakdown, ...styles.roundBreakdownExpanded }
            : styles.roundBreakdown
        }
      >
        <RoundBreakdown
          players={match.players}
          round={selectedRound}
          onPressClose={() => {
            setShowRoundBreakdown(false);
            setTimeout(() => setSelectedRoundNum(undefined), 250);
          }}
        />
      </div>
      <MatchTeamStats match={match} />
      <Spacer height="10px" />
      <MatchTable match={match} />
    </div>
  );
};
