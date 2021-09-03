import { Match } from "../types/match";
import { getRoundType } from "../util/roundType";

interface Props {
  match: Match;
}

export const RoundInfo = ({ match }: Props) => {
  return (
    <>
      <h2>Rounds</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {match?.roundResults.map((round) => {
          return (
            <div key={round.roundNum}>
              <div>{round.roundNum}</div>
              <div>{round.winningTeam}</div>
              <div>
                {getRoundType(round).blue} {getRoundType(round).red}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
