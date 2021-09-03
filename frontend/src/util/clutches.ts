import { Player } from "../types/player";
import { Round } from "../types/round";
import { makeRoundTimeline } from "./roundTimeline";

export interface Clutches {
  "1v1": number;
  "1v2": number;
  "1v3": number;
  "1v4": number;
  "1v5": number;
}

interface Clutch {
  player: string;
  enemies: number;
  team: "Red" | "Blue";
}

interface ClutchInProgress {
  player?: string;
  enemies?: number;
  team?: "Red" | "Blue";
}

export const getTeamPlayersAlive = (
  team: "Red" | "Blue",
  playersAlive: string[],
  players: Player[]
) => {
  return playersAlive.filter((alive) => {
    const player = players.find((p) => p.subject === alive);
    return player?.teamId === team;
  });
};

export const calculateRoundClutch = (
  players: Player[],
  round: Round
): Clutch | false => {
  const timeline = makeRoundTimeline(round);
  if (timeline.length === 0) {
    return false;
  }

  let playersAlive = players.flatMap((p) => p.subject);
  let currentClutch: ClutchInProgress = {
    player: undefined,
    enemies: undefined,
    team: undefined,
  };

  let secondaryClutch: ClutchInProgress = {
    player: undefined,
    enemies: undefined,
    team: undefined,
  };

  for (const i in timeline) {
    const kill = timeline[i];
    const victim = players.find((player) => player.subject === kill.victim);

    if (victim === undefined) {
      console.log(`Couldn't find player ${kill.victim}`);
      break;
    }

    playersAlive = playersAlive.filter((p) => p !== victim.subject);

    // If that kill triggered a clutch...
    if (currentClutch.player === undefined) {
      const redTeamAlive = getTeamPlayersAlive("Red", playersAlive, players);
      const blueTeamAlive = getTeamPlayersAlive("Blue", playersAlive, players);

      if (redTeamAlive.length == 1) {
        currentClutch = {
          player: redTeamAlive[0],
          enemies: blueTeamAlive.length,
          team: "Red",
        };
      }

      if (blueTeamAlive.length == 1) {
        currentClutch = {
          player: blueTeamAlive[0],
          enemies: redTeamAlive.length,
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
            player: blueTeamAlive[0],
            enemies: 1,
            team: "Blue",
          };
        }

        if (currentClutch.team === "Blue") {
          secondaryClutch = {
            player: redTeamAlive[0],
            enemies: 1,
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
        return secondaryClutch as Clutch
      }
    }
  }

  // Nobody clutched in this round
  return false;
};

export const calculateClutches = (players: Player[], rounds: Round[]) => {
  let clutches: Record<Player["subject"], Clutches> = {};
  players.map((player) => {
    clutches[player.subject] = {
      "1v1": 0,
      "1v2": 0,
      "1v3": 0,
      "1v4": 0,
      "1v5": 0,
    };
  });

  rounds.map((round) => {
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
