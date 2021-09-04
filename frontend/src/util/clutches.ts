/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
import { makeRoundTimeline } from "./roundTimeline";
import type { Player } from "../types/player";
import type { Round } from "../types/round";

export interface Clutches {
  "1v1": number;
  "1v2": number;
  "1v3": number;
  "1v4": number;
  "1v5": number;
}

interface Clutch {
  readonly player: string;
  readonly enemies: number;
  readonly team: "Blue" | "Red";
}

interface ClutchInProgress {
  readonly player?: string;
  readonly enemies?: number;
  readonly team?: "Blue" | "Red";
}

export const getTeamPlayersAlive = (
  team: "Blue" | "Red",
  playersAlive: readonly string[],
  players: readonly Player[]
) => {
  return playersAlive.filter((alive) => {
    const player = players.find((p) => p.subject === alive);
    return player?.teamId === team;
  });
};

export const calculateRoundClutch = (
  players: readonly Player[],
  round: Round
): Clutch | false => {
  const timeline = makeRoundTimeline(round);
  if (timeline.length === 0) {
    return false;
  }

  let playersAlive = players.flatMap((p) => p.subject);
  let currentClutch: ClutchInProgress = {
    enemies: undefined,
    player: undefined,
    team: undefined,
  };

  let secondaryClutch: ClutchInProgress = {
    enemies: undefined,
    player: undefined,
    team: undefined,
  };

  timeline.forEach((kill) => {
    const victim = players.find((player) => player.subject === kill.victim);

    if (victim === undefined) {
      console.log(`Couldn't find player ${kill.victim}`);
      return;
    }

    playersAlive = playersAlive.filter((p) => p !== victim.subject);

    // If that kill triggered a clutch...
    if (currentClutch.player === undefined) {
      const redTeamAlive = getTeamPlayersAlive("Red", playersAlive, players);
      const blueTeamAlive = getTeamPlayersAlive("Blue", playersAlive, players);

      if (redTeamAlive.length === 1) {
        currentClutch = {
          enemies: blueTeamAlive.length,
          player: redTeamAlive[0],
          team: "Red",
        };
      }

      if (blueTeamAlive.length === 1) {
        currentClutch = {
          enemies: redTeamAlive.length,
          player: blueTeamAlive[0],
          team: "Blue",
        };
      }
    }

    // See if a current clutch succeeded
    if (currentClutch.player !== undefined) {
      const redTeamAlive = getTeamPlayersAlive("Red", playersAlive, players);
      const blueTeamAlive = getTeamPlayersAlive("Blue", playersAlive, players);

      // Check the weird case of a 1vX turning into a 1v1
      if (redTeamAlive.length === 1 && blueTeamAlive.length === 1) {
        if (currentClutch.team === "Red") {
          secondaryClutch = {
            enemies: 1,
            player: blueTeamAlive[0],
            team: "Blue",
          };
        }

        if (currentClutch.team === "Blue") {
          secondaryClutch = {
            enemies: 1,
            player: redTeamAlive[0],
            team: "Red",
          };
        }
      }

      // Check the normal case
      if (
        (currentClutch.team === "Red" && blueTeamAlive.length === 0) ||
        (currentClutch.team === "Blue" && redTeamAlive.length === 0)
      ) {
        return currentClutch as Clutch;
      }

      // Check if the secondary clutch succeeded
      if (
        (secondaryClutch.team === "Red" && blueTeamAlive.length === 0) ||
        (secondaryClutch.team === "Blue" && redTeamAlive.length === 0)
      ) {
        return secondaryClutch as Clutch;
      }
    }
  });

  // No clutch!
  return false;
};

export const calculateClutches = (
  players: readonly Player[],
  rounds: readonly Round[]
) => {
  // eslint-disable-next-line prefer-const
  let clutches: Record<Player["subject"], Clutches> = {};

  players.forEach((player) => {
    clutches[player.subject] = {
      "1v1": 0,
      "1v2": 0,
      "1v3": 0,
      "1v4": 0,
      "1v5": 0,
    };
  });

  rounds.forEach((round) => {
    const clutch = calculateRoundClutch(players, round);
    if (clutch !== false) {
      switch (clutch.enemies) {
        case 1:
          clutches[clutch.player]["1v1"] += 1;
          break;
        case 2:
          clutches[clutch.player]["1v2"] += 1;
          break;
        case 3:
          clutches[clutch.player]["1v3"] += 1;
          break;
        case 4:
          clutches[clutch.player]["1v4"] += 1;
          break;
        case 5:
          clutches[clutch.player]["1v5"] += 1;
          break;
        default:
          console.log("shit is broke, this isn't possible");
          break;
      }
    }
  });

  return clutches;
};
