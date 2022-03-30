import { ArmorIcon } from "../ArmorIcon";
import { PlayerName } from "../PlayerName";
import { Spacer } from "../Spacer";
import { WeaponIcon } from "../WeaponIcon";
import { colors, makeAlpha } from "../../util/colorPalette";
import type { ArmorId } from "../ArmorIcon";
import type { CSSProperties } from "react";
import type { Player } from "../../types/match";
import type { Round } from "../../types/round";
import type { WeaponId } from "../WeaponIcon";

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: `${colors.shadow}`,
    border: `1px solid ${makeAlpha(colors.gold, 0.2)}`,
    overflow: "hidden",
    paddingBottom: "4px",
    paddingTop: "4px",
    width: "90vw",
  },
  tableBody: { padding: "1px", paddingLeft: "10px" },
  tableBodyRow: {},
  tableHeadeRow: {},
  tableHeader: { padding: "1px", paddingLeft: "10px" },
  text: {
    color: colors.white,
    fontFamily: "Lato",
    fontSize: "0.8em",
  },
};

interface Props {
  readonly players: readonly Player[];
  readonly round?: Round;
}

export const LoadoutsTable = ({ players, round }: Props) => {
  if (!round) {
    return <Spacer height="12em" />;
  }

  const sortedPlayerEconomies = [...round.playerEconomies].sort((e) => {
    const player = players.find((p) => p.subject === e.subject);
    if (!player) {
      return 0;
    }
    return player.teamId.localeCompare("Red");
  });

  return (
    <table style={styles.text}>
      <thead>
        <tr style={styles.tableHeaderRow}>
          <th style={styles.tableHeader}>Name</th>
          <th style={styles.tableHeader}>Loadout value</th>
          <th style={styles.tableHeader}>Spend</th>
          <th style={styles.tableHeader}>Remaining</th>
          <th style={styles.tableHeader}>Weapon</th>
          <th style={styles.tableHeader}>Armor</th>
        </tr>
      </thead>
      <tbody>
        {sortedPlayerEconomies.map((playerEconomy) => {
          const player = players.find(
            (p) => p.subject === playerEconomy.subject
          );

          if (player === undefined) {
            throw new Error(
              `couldn't find player with id ${playerEconomy.subject}`
            );
          }

          const playerTeam = player.teamId as "Blue" | "Red";

          return (
            <tr style={styles.tableBodyRow}>
              <td
                style={{
                  ...styles.tableBody,
                  borderLeft:
                    playerTeam === "Blue"
                      ? `5px solid ${colors.blueTeamDarker1}`
                      : `5px solid ${colors.redTeamDarker1}`,
                }}
              >
                <PlayerName name={player.gameName} tag={player.tagLine} />
              </td>
              <td style={styles.tableBody}>{playerEconomy.loadoutValue}</td>
              <td style={styles.tableBody}>{playerEconomy.spent}</td>
              <td style={styles.tableBody}>{playerEconomy.remaining}</td>
              <td style={styles.tableBody}>
                <WeaponIcon
                  weaponId={playerEconomy.weapon as WeaponId}
                  height={20}
                />
              </td>
              <td style={styles.tableBody}>
                {playerEconomy.armor && (
                  <ArmorIcon armorId={playerEconomy.armor as ArmorId} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
