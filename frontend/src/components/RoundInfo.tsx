import { getRoundType } from "../util/roundType";
import type { Match } from "../types/match";

interface Props {
  readonly match: Match;
}

export const RoundInfo = ({ match }: Props) => {
  return (
    <>
      <h2>Rounds</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {match.roundResults.map((round) => {
          return (
            <div key={round.roundNum}>
              <div>{round.roundNum}</div>
              <div>{round.winningTeam}</div>
              <div>
                {getRoundType(round, match.players).blue} {getRoundType(round, match.players).red}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
