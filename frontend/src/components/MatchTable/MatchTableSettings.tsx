import { Spacer } from "../Spacer";
import { Switch } from "../Switch";
import { colors, gradients, makeAlpha } from "../../util/colorPalette";
import { common } from "../../util/styles";
import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  container: {
    background: gradients.mainBackgroundVertical,
    border: `1px solid ${makeAlpha(colors.gold, 0.1)}`,
    borderRadius: "5px",
    boxShadow: "1px 2px 3px rgba(0,0,0,.4)",
    color: colors.white,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "5px",
    position: "absolute",
    right: "2em",
    top: 0,
    width: "80vw",
    zIndex: 5,
  },
  settingItem: {
    ...common.row,
    alignItems: "center",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    boxShadow: "1px 1px 1px rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    margin: "5px",
    padding: "3px",
    width: "11em",
  },
  settingName: {
    fontFamily: "LatoBlack",
    fontSize: "0.8em",
  },
};

interface SettingGroup {
  readonly display: boolean;
  readonly order: number;
  readonly title: string;
}

const settingsGroups: Record<string, SettingGroup> = {
  basic: { display: true, order: 0, title: "Basic" },
  clutch: { display: true, order: 1, title: "Clutches" },
  computed: { display: true, order: 2, title: "Computed" },
  dev: { display: false, order: 5, title: "Dev" },
  kast: { display: true, order: 4, title: "KAST" },
  multi: { display: true, order: 3, title: "Multikills" },
};

export type SettingsGroupName = keyof typeof settingsGroups;

export interface Setting {
  readonly key: string;
  readonly name: string;
  readonly value: boolean;
  readonly group?: SettingsGroupName;
}

interface Props {
  readonly settings: Setting[];
  readonly onChangeSetting: (settingKey: string, newValue: boolean) => void;
}

export const MatchTableSettings = ({ onChangeSetting, settings }: Props) => {
  const settingsComponents = Object.entries(settingsGroups).map(
    ([groupName, group]) => {
      const filteredSettings = settings.filter((s) => s.group === groupName);
      return (
        <div>
          <span>{group.title}</span>
          {filteredSettings.map((setting) => {
            return (
              <div key={`${setting.key}`} style={styles.settingItem}>
                <Switch
                  onChange={(newValue) =>
                    onChangeSetting(setting.key, newValue)
                  }
                  value={setting.value}
                />
                <Spacer width="25px" />
                <span style={styles.settingName}>{setting.name}</span>
              </div>
            );
          })}
        </div>
      );
    }
  );

  return <div style={styles.container}>{settingsComponents}</div>;
};
