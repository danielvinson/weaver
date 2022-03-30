import { RoundResultIcon } from "./RoundResultIcon";
import { Row } from "../Row";
import { Spacer } from "../Spacer";
import { colors, makeAlpha } from "../../util/colorPalette";
import type { CSSProperties } from "react";
import type { Match } from "../../types/match";
import type { RoundResultCode } from "./RoundResultIcon";

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: `${colors.shadow}`,
    border: `1px solid ${makeAlpha(colors.gold, 0.2)}`,
    overflow: "hidden",
    paddingBottom: "4px",
    paddingTop: "4px",
    width: "90vw",
  },
  round: {
    alignItems: "center",
    border: "1px solid transparent",
    borderRadius: "8px",
    color: colors.white,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Lato",
    fontSize: "0.7em",
    padding: "4px",
  },
  selectedRound: {
    backgroundColor: makeAlpha(colors.header, 0.4),
    border: `1px solid ${colors.gold}`,
    fontFamily: "LatoBlack",
  },
  timelineSeparator: {
    borderLeft: `3px solid ${makeAlpha(colors.header, 0.4)}`,
    marginLeft: "8px",
    marginRight: "8px",
  },
};

interface Props {
  readonly match: Match;
  readonly selectedRound?: number | undefined;
  readonly onSelectRound?: (roundNum: number | undefined) => void;
}

export const MatchTimeline = ({
  match,
  onSelectRound,
  selectedRound,
}: Props) => {
  const totalRounds = match.roundResults.length;
  const shouldBeSeparator = (roundNum: number) => {
    if (roundNum === 12) return true;
    if (roundNum === 24 && totalRounds > 24) return true;
    if (roundNum > 24 && roundNum % 2 === 0 && totalRounds > roundNum)
      return true;
    return false;
  };

  return (
    <div style={styles.container}>
      <Row>
        {match.roundResults.map((round) => (
          <>
            <div
              style={
                round.roundNum === selectedRound
                  ? { ...styles.round, ...styles.selectedRound }
                  : styles.round
              }
              onClick={() => {
                onSelectRound?.(round.roundNum);
              }}
            >
              <span>{round.roundNum}</span>
              <Spacer height="3px" />
              <RoundResultIcon
                resultCode={round.roundResultCode as RoundResultCode}
                winningTeam={round.winningTeam as "Blue" | "Red"}
              />
              <Spacer height="3px" />
              <span>{round.plantSite}</span>
            </div>
            {shouldBeSeparator(round.roundNum) && (
              <div style={styles.timelineSeparator} />
            )}
          </>
        ))}
      </Row>
    </div>
  );
};
