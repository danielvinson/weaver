/* eslint-disable functional/immutable-data */

import { MatchTableCell } from "./MatchTableCell";
import { MatchTableSettings } from "./MatchTableSettings";
import { SortableTable } from "../SortableTable";
import { Spacer } from "../Spacer";
import { Switch } from "../Switch";
import { calculateAgentPerformance } from "../../util/stats/agentPerformance";
import { calculateClutches } from "../../util/stats/clutches";
import { calculateFirstDeaths } from "../../util/stats/firstDeaths";
import { calculateFirstKills } from "../../util/stats/firstKills";
import { calculateHeadshotData } from "../../util/stats/headshot";
import {
  calculateKastNumbers,
  calculateKastPercents,
} from "../../util/stats/kast";
import { calculateMatchMultikills } from "../../util/stats/multiKills";
import { calculateRWS, calculateWeightedRWS } from "../../util/stats/rws";
import { colors } from "../../util/colorPalette";
import { common } from "../../util/styles";
import { defaultTableHeaders } from "./tableHeaders";
import { getRoundType } from "../../util/stats/roundType";
import { default as lodash } from "lodash";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import type { Match as MatchType, TeamName } from "../../types/match";
import type { Setting } from "./MatchTableSettings";
import type { TableHeader } from "../SortableTable";

export interface PlayerData {
  readonly id: string;
  readonly team: TeamName;
  readonly name: string;
  readonly tag: string;
  readonly agent: string;
  readonly rank: number;
  readonly combat: number;
  readonly kills: number;
  readonly deaths: number;
  readonly assists: number;
  readonly rws: number;
  readonly wrws: number;
  readonly fk: number;
  readonly fd: number;
  readonly clutch: number;
  readonly clutchv1: number;
  readonly clutchv2: number;
  readonly clutchv3: number;
  readonly clutchv4: number;
  readonly clutchv5: number;
  readonly kast: number;
  readonly multiKills1: number;
  readonly multiKills2: number;
  readonly multiKills3: number;
  readonly multiKills4: number;
  readonly multiKills5: number;
  readonly ecoKills: number;
  readonly gunRoundKills: number;
  readonly pistolKills: number;
  readonly forceKills: number;
  readonly kastKills: number;
  readonly kastAssists: number;
  readonly kastTrades: number;
  readonly kastSurvived: number;
  readonly kda: string;
  readonly hsPercentBullet: number;
  readonly hsPercentKill: number;
  readonly agentWeightedAcs: number;
  readonly agentWeightedWrwcs: number;
}

interface Props {
  readonly match: MatchType;
}

export const MatchTable = ({ match }: Props) => {
  const [matchTableData, setMatchTableData] = useState<PlayerData[]>();
  const [separateTeams, setSeparateTeams] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(
    defaultTableHeaders.map((th, index) => ({ ...th, order: index }))
  );
  const [sideOption, setSideOption] = useState<string>("both");

  // Calculate data and build table
  useEffect(() => {
    const tableData: PlayerData[] = [];
    const filteredRoundResults = match.roundResults;

    const clutches = calculateClutches(match.players, filteredRoundResults);
    const firstKills = calculateFirstKills(match.players, filteredRoundResults);
    const firstDeaths = calculateFirstDeaths(
      match.players,
      filteredRoundResults
    );
    const headshotPercents = calculateHeadshotData(match);

    const rwsData: Record<string, number> = {};
    match.roundResults.forEach((round) => {
      const rws = calculateRWS(round, match.players);
      Object.entries(rws).forEach(([key, val]) => {
        if (!(key in rwsData)) {
          rwsData[key] = val;
        }
        rwsData[key] += val;
      });
    });

    const wrwsData: Record<string, number> = {};
    match.roundResults.forEach((round) => {
      const rws = calculateWeightedRWS(round, match.players);
      Object.entries(rws).forEach(([key, val]) => {
        if (!(key in wrwsData)) {
          wrwsData[key] = val;
        }
        wrwsData[key] += val;
      });
    });

    const multiKills = calculateMatchMultikills(
      match.players,
      match.roundResults
    );

    interface EcoData {
      force: number;
      full: number;
      pistol: number;
      save: number;
    }

    const ecoKillData: Record<string, EcoData> = {};
    match.players.forEach((player) => {
      ecoKillData[player.subject] = {
        force: 0,
        full: 0,
        pistol: 0,
        save: 0,
      };
    });

    match.roundResults.forEach((round) => {
      const roundTypes = getRoundType(round, match.players);
      const kills = round.playerStats.flatMap((stats) => stats.kills);
      kills.forEach((kill) => {
        const killer = match.players.find((p) => p.subject === kill.killer);
        const victim = match.players.find((p) => p.subject === kill.victim);
        if (killer === undefined || victim === undefined) {
          return; //impossible
        }
        const victimRoundType =
          roundTypes[victim.teamId === "Blue" ? "blue" : "red"];
        ecoKillData[kill.killer][victimRoundType] += 1;
      });
    });

    const kastPercents = calculateKastPercents(
      match.roundResults,
      match.players
    );

    const kastNumbers = calculateKastNumbers(match.roundResults, match.players);

    // Build table data
    match.players.forEach((player) => {
      const teamRoundsWon = match.roundResults.filter(
        (r) => r.winningTeam === player.teamId
      ).length;
      const totalClutches = Object.entries(
        clutches[player.subject]
      ).reduce<number>((prev, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [_, val] = cur;
        return prev + (val as number);
      }, 0);

      tableData.push({
        agent: player.characterId,
        agentWeightedAcs: calculateAgentPerformance(
          player,
          player.stats.score / player.stats.roundsPlayed
        ),
        agentWeightedWrwcs: calculateAgentPerformance(
          player,
          wrwsData[player.subject] / teamRoundsWon
        ),
        assists: player.stats.assists,
        clutch: totalClutches,
        clutchv1: clutches[player.subject]["1v1"],
        clutchv2: clutches[player.subject]["1v2"],
        clutchv3: clutches[player.subject]["1v3"],
        clutchv4: clutches[player.subject]["1v4"],
        clutchv5: clutches[player.subject]["1v5"],
        combat: player.stats.score / player.stats.roundsPlayed,
        deaths: player.stats.deaths,
        ecoKills: ecoKillData[player.subject].save,
        fd: firstDeaths[player.subject],
        fk: firstKills[player.subject],
        forceKills: ecoKillData[player.subject].force,
        gunRoundKills: ecoKillData[player.subject].full,
        hsPercentBullet: headshotPercents[player.subject].bullet * 100,
        hsPercentKill: headshotPercents[player.subject].kill * 100,
        id: player.subject,
        kast: kastPercents[player.subject],
        kastAssists: kastNumbers[player.subject].assist,
        kastKills: kastNumbers[player.subject].kill,
        kastSurvived: kastNumbers[player.subject].survive,
        kastTrades: kastNumbers[player.subject].trade,
        kda: `${player.stats.kills}  /  ${player.stats.deaths}  /  ${player.stats.assists}`,
        kills: player.stats.kills,
        multiKills1: multiKills[player.subject]["1"],
        multiKills2: multiKills[player.subject]["2"],
        multiKills3: multiKills[player.subject]["3"],
        multiKills4: multiKills[player.subject]["4"],
        multiKills5: multiKills[player.subject]["5"],
        name: player.gameName,
        pistolKills: ecoKillData[player.subject].pistol,
        rank: player.competitiveTier,
        rws: rwsData[player.subject] / teamRoundsWon,
        tag: player.tagLine,
        team: player.teamId,
        wrws: wrwsData[player.subject] / teamRoundsWon,
      });
    });

    setMatchTableData(tableData);
  }, [match]);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleChangeSetting = (key: string, newValue: boolean) => {
    const oldHeader = tableHeaders.find((th) => th.key === key);
    if (!oldHeader) {
      return; // shouldn't be possible
    }
    const newHeader: TableHeader = {
      ...oldHeader,
      display: newValue,
    };
    const otherHeaders = tableHeaders.filter((th) => th.key !== key);
    setTableHeaders(lodash.sortBy(otherHeaders.concat(newHeader), ["order"]));
  };

  if (matchTableData === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Options */}
      <div
        style={{
          ...common.row,
          alignItems: "center",
          justifyContent: "space-between",
          width: "90vw",
        }}
      >
        <div style={{ ...common.row, alignItems: "center" }}>
          <div style={{ ...common.row, alignItems: "center" }}>
            <Switch
              value={separateTeams}
              onChange={(newValue: boolean) => setSeparateTeams(newValue)}
            />
            <Spacer width="5px" />
            <span style={{ color: colors.white, fontSize: "0.9em" }}>
              Separate Teams
            </span>
          </div>

          <Spacer width="15px" />

          {/*
          <div style={{ ...common.row, alignItems: "center" }}>
            <select
              style={{
                background: colors.shadow,
                color: colors.white,
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
              onChange={(e) => setSideOption(e.target.value)}
            >
              <option value="both">Both Sides</option>
              <option value="attack">Attack</option>
              <option value="defense">Defense</option>
            </select>
          </div>
          */}
        </div>

        <div style={{ position: "relative" }}>
          <span
            style={{
              alignSelf: "flex-end",
              color: colors.white,
              cursor: "pointer",
              fontSize: "2em",
            }}
            onClick={() => handleSettingsClick()}
          >
            &#x2699;
          </span>
          {settingsOpen && (
            <Modal
              shouldCloseOnOverlayClick={true}
              isOpen={settingsOpen}
              onRequestClose={() => handleSettingsClick()}
              style={{
                content: {
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  borderRadius: 0,
                  display: "flex",
                  flexDirection: "row",
                  height: "auto",
                  inset: 0,
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                  position: "relative",
                  width: "auto",
                },
                overlay: {
                  alignItems: "center",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                },
              }}
            >
              <MatchTableSettings
                onChangeSetting={handleChangeSetting}
                settings={tableHeaders.map<Setting>((th) => ({
                  group: th.group,
                  key: th.key,
                  name: th.name,
                  value: th.display,
                }))}
              />
            </Modal>
          )}
        </div>
      </div>
      <Spacer height="5px" />
      <div style={{ width: "90vw" }}>
        {separateTeams ? (
          <>
            <SortableTable
              headers={tableHeaders}
              data={matchTableData.filter((p) => p.team === "Blue")}
              defaultSort={{
                direction: "Descending",
                key: "combat",
              }}
              renderCell={(key, index, val, item) => (
                <MatchTableCell
                  dataKey={key}
                  index={index}
                  value={val}
                  player={item}
                />
              )}
            />
            <SortableTable
              headers={tableHeaders}
              data={matchTableData.filter((p) => p.team === "Red")}
              defaultSort={{
                direction: "Descending",
                key: "combat",
              }}
              renderCell={(key, index, val, item) => (
                <MatchTableCell
                  dataKey={key}
                  index={index}
                  value={val}
                  player={item}
                />
              )}
            />
          </>
        ) : (
          <SortableTable
            headers={tableHeaders}
            data={matchTableData}
            defaultSort={{
              direction: "Descending",
              key: "combat",
            }}
            renderCell={(key, index, val, item) => (
              <MatchTableCell
                dataKey={key}
                index={index}
                value={val}
                player={item}
              />
            )}
          />
        )}
      </div>
    </>
  );
};
