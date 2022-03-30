import { calcRetakeWins } from "../../util/stats/retakeWinPercent";
import { colors, makeAlpha } from "../../util/colorPalette";
import { getRoundType } from "../../util/stats/roundType";
import type { CSSProperties } from "react";
import type { Match } from "../../types/match";

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: `${colors.shadow}`,
    border: `1px solid ${makeAlpha(colors.gold, 0.2)}`,
    overflow: "hidden",
    paddingBottom: "4px",
    paddingTop: "4px",
    width: "90vw",
  },
  tableBody: { padding: "5px" },
  tableBodyRow: {},
  tableHeadeRow: {},
  tableHeader: { fontFamily: "LatoBold", padding: "5px" },
  text: {
    color: colors.white,
    fontFamily: "Lato",
    fontSize: "0.8em",
  },
};

interface Props {
  readonly match: Match;
}

export const MatchTeamStats = ({ match }: Props) => {
  const retakeWins = calcRetakeWins(match);

  const roundTypes = match.roundResults.map((round) => {
    const roundType = getRoundType(round, match.players);
    return {
      Blue: roundType.blue,
      Red: roundType.red,
      roundNumber: round.roundNum,
    };
  });

  return (
    <div style={styles.container}>
      <table style={styles.text}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th
              style={{
                ...styles.tableHeader,
                borderLeft: "5px solid transparent",
              }}
            >
              Team
            </th>
            <th style={styles.tableHeader}>Pistol Round Wins</th>
            <th style={styles.tableHeader}>Eco Round Wins</th>
            <th style={styles.tableHeader}>Anti-Eco Round Wins</th>
            <th style={styles.tableHeader}>Gun Round Round Wins</th>
            <th style={styles.tableHeader}>Retake Win %</th>
            <th style={styles.tableHeader}>Retake A Attempts</th>
            <th style={styles.tableHeader}>Retake A Wins</th>
            <th style={styles.tableHeader}>Retake B Attempts</th>
            <th style={styles.tableHeader}>Retake B Wins</th>
            {match.map === "haven" && (
              <>
                <th style={styles.tableHeader}>Retake C Attempts</th>
                <th style={styles.tableHeader}>Retake C Wins</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {match.teams.map((team) => {
            const teamId = team.teamId as "Blue" | "Red";
            const otherTeamId = teamId === "Blue" ? "Red" : "Blue";

            // Round Type Results
            // Pistol rounds
            const pistolRoundNumbers = roundTypes
              .filter((rt) => rt[teamId] === "pistol")
              .map((rt) => rt.roundNumber);
            const pistolRounds = match.roundResults.filter((rr) =>
              pistolRoundNumbers.includes(rr.roundNum)
            );
            const pistolWins = pistolRounds.reduce(
              (total, r) => (r.winningTeam === teamId ? total + 1 : total),
              0
            );

            // Eco rounds (save against a Force or Full buy)
            const ecoRoundNumbers = roundTypes
              .filter(
                (rt) =>
                  rt[teamId] === "save" &&
                  (rt[otherTeamId] === "force" || rt[otherTeamId] === "full")
              )
              .map((rt) => rt.roundNumber);
            const ecoRounds = match.roundResults.filter((rr) =>
              ecoRoundNumbers.includes(rr.roundNum)
            );
            const ecoRoundWins = ecoRounds.reduce(
              (total, r) => (r.winningTeam === teamId ? total + 1 : total),
              0
            );

            // Anti-Eco Rounds (force buy or full buy against save)
            const antiEcoRoundNumbers = roundTypes
              .filter(
                (rt) =>
                  rt[otherTeamId] === "save" &&
                  (rt[teamId] === "force" || rt[teamId] === "full")
              )
              .map((rt) => rt.roundNumber);
            const antiEcoRounds = match.roundResults.filter((rr) =>
              antiEcoRoundNumbers.includes(rr.roundNum)
            );
            const antiEcoRoundWins = antiEcoRounds.reduce(
              (total, r) => (r.winningTeam === teamId ? total + 1 : total),
              0
            );

            // Full gun rounds (full vs. full)
            const gunRoundNumbers = roundTypes
              .filter(
                (rt) => rt[teamId] === "full" && rt[otherTeamId] === "full"
              )
              .map((rt) => rt.roundNumber);
            const gunRounds = match.roundResults.filter((rr) =>
              gunRoundNumbers.includes(rr.roundNum)
            );
            const gunRoundWins = gunRounds.reduce(
              (total, r) => (r.winningTeam === teamId ? total + 1 : total),
              0
            );

            // Retakes
            const allRetakeAttempts = [
              ...retakeWins[teamId].A.attempts,
              ...retakeWins[teamId].B.attempts,
              ...retakeWins[teamId].C.attempts,
            ];
            const totalRetakeWinPercent =
              (retakeWins[teamId].A.successes +
                retakeWins[teamId].B.successes +
                retakeWins[teamId].C.successes) /
              allRetakeAttempts.length;

            return (
              <tr style={styles.tableBodyRow}>
                <td
                  style={{
                    ...styles.tableBody,
                    borderLeft:
                      teamId === "Blue"
                        ? `5px solid ${colors.blueTeamDarker1}`
                        : `5px solid ${colors.redTeamDarker1}`,
                  }}
                >
                  {team.teamId}
                </td>
                <td
                  style={styles.tableBody}
                >{`${pistolWins} / ${pistolRoundNumbers.length}`}</td>
                <td
                  style={styles.tableBody}
                >{`${ecoRoundWins} / ${ecoRoundNumbers.length}`}</td>
                <td
                  style={styles.tableBody}
                >{`${antiEcoRoundWins} / ${antiEcoRoundNumbers.length}`}</td>
                <td
                  style={styles.tableBody}
                >{`${gunRoundWins} / ${gunRoundNumbers.length}`}</td>
                {/* Retakes */}
                <td style={styles.tableBody}>
                  {(totalRetakeWinPercent * 100).toFixed(2) + "%"}
                </td>
                <td style={styles.tableBody}>
                  {retakeWins[teamId].A.attempts.length}
                </td>
                <td style={styles.tableBody}>
                  {retakeWins[teamId].A.successes}
                </td>
                <td style={styles.tableBody}>
                  {retakeWins[teamId].B.attempts.length}
                </td>
                <td style={styles.tableBody}>
                  {retakeWins[teamId].B.successes}
                </td>
                {match.map === "haven" && (
                  <>
                    <td style={styles.tableBody}>
                      {retakeWins[teamId].C.attempts.length}
                    </td>
                    <td style={styles.tableBody}>
                      {retakeWins[teamId].C.successes}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
