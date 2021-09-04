import { AgentIcon } from "./AgentIcon";
import { RankIcon } from "./RankIcon";
import { colorScales, colors } from "../util/colorPalette";
import { maps } from "./Map";
import type { AgentId } from "./AgentIcon";
import type { CSSProperties } from "react";
import type { MatchHistoryMatch } from "../types/match";

const styles: Record<string, CSSProperties> = {
  column: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    marginRight: "20px",
    // borderRight: "1px solid rgba(231, 215, 193, 0.5)",
    padding: 5,
  },
  container: {
    alignItems: "center",
    border: `1px solid rgba(23, 29, 38, 0.2)`,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    height: "150px",

    justifyContent: "flex-start",
    margin: "2px",
    overflow: "hidden",
    width: "600px",
  },
  defeatText: {
    color: "red",
  },
  drawText: {
    color: colors.highlight,
  },
  mapName: {
    color: colors.highlight,
  },
  ratingChange: {
    fontWeight: "bold",
  },
  victoryText: {
    color: "#049F23",
  },
};

interface Props {
  readonly match: MatchHistoryMatch;
}

const normalizeRange = (
  oldValue: number,
  oMin: number,
  oMax: number,
  nMin: number,
  nMax: number
): number => {
  return parseInt(
    (((oldValue - oMin) / (oMax - oMin)) * (nMax - nMin) + nMin).toFixed(0)
  );
};

export const MatchSummary = ({ match }: Props) => {
  const combatScore = match.score / match.roundsPlayed;

  // Change from -30 - 50 range  => 0-9 range
  const normalizedRatingChange =
    9 - normalizeRange(match.rankedRatingEarned, -30, 50, 0, 9);
  const normalizedCombatScore = normalizeRange(combatScore, 100, 400, 0, 9);
  const normalizedKills = normalizeRange(match.kills, 0, 40, 0, 9);
  const normalizedDeaths = normalizeRange(match.deaths, 0, 35, 0, 9);
  const normalizedAssists = normalizeRange(match.assists, 0, 20, 0, 9);

  const overlayGradient =
    "linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0), rgba(0,0,0,0.1))";
  const backgroundColor =
    "linear-gradient(90deg, rgba(23, 29, 38,1) 0%, rgba(28, 68, 115,1) 70%, rgba(28, 68, 115,0) 85%)";
  const backgroundImage = `url(${maps[match.map]}) no-repeat right bottom`;

  return (
    <div
      style={{
        ...styles.container,
        background:
          overlayGradient + "," + backgroundColor + "," + backgroundImage,
        backgroundSize: "cover, cover, 300px",
      }}
    >
      {/* Rank */}
      <div style={styles.column}>
        <RankIcon rankNumber={22} />
        {}
      </div>

      {/* Agent Icon */}
      <div style={styles.column}>
        <AgentIcon agentId={match.agentId as AgentId} width={50} height={50} />
      </div>

      {/* Win/Loss and RR change */}
      <div style={styles.column}>
        {match.winStatus === "win" && (
          <div style={styles.victoryText}>Victory</div>
        )}
        {match.winStatus === "draw" && <div style={styles.drawText}>Draw</div>}
        {match.winStatus === "loss" && (
          <div style={styles.defeatText}>Defeat</div>
        )}
        <span
          style={{
            ...styles.ratingChange,
            color: colorScales.greenToRed[normalizedRatingChange],
          }}
        >
          {match.rankedRatingEarned > 0
            ? `+${match.rankedRatingEarned} RR`
            : `${match.rankedRatingEarned} RR`}
        </span>
      </div>

      {/* Combat Score and KDA */}
      <div style={styles.column}>
        <span
          style={{ color: colorScales.neutralToGreen[normalizedCombatScore] }}
        >
          {combatScore.toFixed(0)}
        </span>

        <div>
          <span
            style={{
              color: colorScales.neutralToGreen[normalizedKills],
            }}
          >
            {match.kills}
          </span>
          <span> / </span>
          <span
            style={{
              color: colorScales.neutralToRed[normalizedDeaths],
            }}
          >
            {match.deaths}
          </span>
          <span> / </span>
          <span
            style={{
              color: colorScales.neutralToGreen[normalizedAssists],
            }}
          >
            {match.assists}
          </span>
        </div>
      </div>
    </div>
  );
};
