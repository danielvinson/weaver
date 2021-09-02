import React, { useState } from "react";
import { useEffect } from "react";
import { api } from "../api/api";
import { Match as MatchType } from "../types/match";
import { getRoundType } from "../util/roundType";
import { getRWS, RWSMap } from "../util/rws";
import { Row } from "./Row";

const styles = {
  redTeam: {
    backgroundColor: "#a22",
    color: "white",
  },
  blueTeam: {
    backgroundColor: "#22a",
    color: "white",
  },
};

interface Props {
  readonly uuid: string;
}

export const Match = ({ uuid }: Props) => {
  const [data, setData] = useState<MatchType>();
  const [rwsData, setRwsData] = useState<RWSMap[]>();

  useEffect(() => {
    api.get(uuid).then((res: any) => {
      setData(res.data);
    });
  }, [uuid]);

  console.log(data);

  // Calculate RWS
  useEffect(() => {
    let rwsData: RWSMap[] = [];
    data?.roundResults.map((round) => {
      rwsData.push(getRWS(round, data.players));
    });
    setRwsData(rwsData);
  }, [data]);

  return (
    <div>
      Match {uuid}
      <h2>Players</h2>
      <table style={{ backgroundColor: "rgba(0,0,0,.2", padding: "5px" }}>
        <tr>
          <th>UUID</th>
          <th>Name</th>
          <th>Combat Score</th>
          <th>Kills</th>
          <th>Deaths</th>
          <th>Assists</th>
          <th>RWS</th>
          <th>Clutches</th>
        </tr>
        {data?.players.map((player) => (
          <tr
            key={player.gameName}
            style={player.teamId === "Red" ? styles.redTeam : styles.blueTeam}
          >
            <td>{player.subject}</td>
            <td>{player.gameName}</td>
            <td>{player.stats.score / player.stats.roundsPlayed}</td>
            <td>{player.stats.kills}</td>
            <td>{player.stats.deaths}</td>
            <td>{player.stats.assists}</td>
            <td>
              {rwsData !== undefined &&
                rwsData
                  .map((data) => data[player.subject])
                  .reduce((val, val2) => val + val2, 0) /
                  player.stats.roundsPlayed}
            </td>
            <td></td>
          </tr>
        ))}
      </table>
      <h2>Rounds</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.roundResults.map((round) => {
          return (
            <Row key={round.roundNum}>
              <div>{round.roundNum}</div>
              <div>{round.winningTeam}</div>
              <div>
                {getRoundType(round).blue} {getRoundType(round).red}
              </div>
            </Row>
          );
        })}
      </div>
    </div>
  );
};
