import { AgentIcon } from "./AgentIcon";
import { RankIcon } from "./RankIcon";
import { Spacer } from "./Spacer";
import { colorScales, colors } from "../util/colorPalette";
import { common } from "../util/styles";
import { maps } from "./Map";
import { normalizeRange } from "../util/normalizeRange";
import moment from "moment";
import type { AgentId } from "./AgentIcon";
import type { CSSProperties } from "react";
import type { MatchHistoryMatch } from "../types/match";

const styles: Record<string, CSSProperties> = {
  container: {
    border: `1px solid rgba(23, 29, 38, 0.2)`,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    height: "100px",
    margin: "2px",
    overflow: "hidden",

    paddingLeft: "10px",
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
  time: {
    color: colors.white,
    fontFamily: "LatoBoldItalic",
    fontSize: "0.7em",
  },
  victoryText: {
    color: "#049F23",
  },
};

interface Props {
  readonly match: MatchHistoryMatch;
}

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
      <div style={common.row}>
        {/* Queue Type */}
        <span style={styles.time}>
          {match.queue === "" ? "CUSTOM" : match.queue.toUpperCase()}
        </span>

        <Spacer width="15px" />

        {/* Time */}
        <span style={styles.time}>{moment(match.matchDate).calendar()}</span>
      </div>

      <div
        style={{
          ...common.row,
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <AgentIcon agentId={match.agentId as AgentId} width={50} height={50} />
        {match.queue === "competitive" && <RankIcon rankNumber={22} />}

        {/* Win/Loss and RR change */}
        <>
          {match.winStatus === "win" && (
            <div style={styles.victoryText}>Victory</div>
          )}
          {match.winStatus === "draw" && (
            <div style={styles.drawText}>Draw</div>
          )}
          {match.winStatus === "loss" && (
            <div style={styles.defeatText}>Defeat</div>
          )}
          {match.queue === "competitive" && (
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
          )}
        </>

        {/* Combat Score and KDA */}
        <>
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
        </>
      </div>
    </div>
  );
};
