import { ModeIcon } from "./ModeIcon";
import { Row } from "./Row";
import { Spacer } from "./Spacer";
import { colors } from "../util/colorPalette";
import { largeMapImages } from "../components/Map";
import Competitive from "../assets/images/competitive.png";
import React from "react";
import moment from "moment";
import type { CSSProperties } from "react";
import type { Match as MatchType } from "../types/match";

const styles: Record<string, CSSProperties> = {
  bigText: {
    color: colors.white,
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  container: {
    border: `1px solid rgba(23, 29, 38, 0.2)`,
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    overflow: "hidden",
    padding: "10px",
    width: "90vw",
  },
  defaultText: {
    color: colors.white,
    fontSize: "0.8em",
    fontWeight: "bold",
  },
};

interface Props {
  readonly match: MatchType;
}

export const MatchTableSummary = ({ match }: Props) => {
  const overlayGradient =
    "linear-gradient(25deg, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.2), rgba(0,0,0,0.1))";
  const mapBackground = `url(${
    largeMapImages[match.map]
  }) no-repeat center/cover`;

  return (
    <div
      style={{
        ...styles.container,
        background: `${overlayGradient}, ${mapBackground}`,
      }}
    >
      <Row>
        <div style={{ ...styles.defaultText, fontStyle: "italic" }}>
          {moment(match.startedAt).format("MMMM Do YYYY, h:mm a")}
        </div>
      </Row>
      <Spacer height="10px" />
      <Row style={{ alignItems: "center", flex: 1 }}>
        <div style={{ ...styles.bigText, ...styles.capitalize }}>
          {match.map === "port" ? "Icebox" : match.map}
        </div>
        <Spacer width="10px" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ ...styles.defaultText, ...styles.capitalize }}>
            {match.queue === "" ? "Custom" : match.queue}
          </span>
          <ModeIcon mode={match.queue} />
        </div>
        <Spacer width="10px" />
        <Row>
          <span
            style={{
              ...styles.bigText,
              color: colors.blueTeam,
            }}
          >
            {match.teams.find((t) => t.teamId === "Blue")?.roundsWon}
          </span>
          <Spacer width="3px" />
          <span style={styles.bigText}>:</span>
          <Spacer width="3px" />
          <span
            style={{
              ...styles.bigText,
              color: colors.redTeam,
            }}
          >
            {match.teams.find((t) => t.teamId === "Red")?.roundsWon}
          </span>
        </Row>
      </Row>
    </div>
  );
};
