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
  tableBody: { padding: "1px" },
  tableBodyRow: {},
  tableHeadeRow: {},
  tableHeader: { padding: "1px" },
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
        {round ? (
          round.playerEconomies.map((playerEconomy) => {
            const player = players.find(
              (p) => p.subject === playerEconomy.subject
            );

            if (player === undefined) {
              throw new Error(
                `couldn't find player with id ${playerEconomy.subject}`
              );
            }

            return (
              <tr style={styles.tableBodyRow}>
                <td style={styles.tableBody}>
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
          })
        ) : (
          <Spacer height="10em" />
        )}
      </tbody>
    </table>
  );
};
