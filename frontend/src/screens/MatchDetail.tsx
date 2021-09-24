import { API } from "../api/api";
import { MatchTable } from "../components/MatchTable";
import { RiseLoader } from "react-spinners";
import { colors } from "../util/colorPalette";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Match as MatchType } from "../types/match";

const testUUID = "8af8c964-4736-492f-b90d-daf7ef12a400";
const testUUID2 = "3598516c-c1a3-4dbb-93a3-af5943b0cefa";

interface Params {
  readonly matchId: string;
}

export const MatchDetail = () => {
  const { matchId } = useParams<Params>();
  const [match, setMatch] = useState<MatchType>();

  // Fetch data from API - refreshes on UUID change
  useEffect(() => {
    const getMatch = async () => {
      const res = await API.getMatch(matchId);

      // Filter out spectators
      const matchWithNoSpectators = {
        ...res,
        players: res.players.filter((p) => p.teamId !== "Neutral"),
      };

      setMatch(matchWithNoSpectators);
      console.log(res);
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
      <MatchTable match={match} />
    </div>
  );
};
