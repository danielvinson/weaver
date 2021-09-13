import { Spacer } from "../Spacer";
import { Switch } from "../Switch";
import { colors } from "../../util/colorPalette";
import { common } from "../../util/styles";
import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  container: {
    background: colors.primary,
    minWidth: "10em",
    position: "absolute",
    right: "10em",
    top: 0,
    zIndex: 5,
  },
};

export interface Setting {
  readonly key: string;
  readonly name: string;
  readonly value: boolean;
}

interface Props {
  readonly settings: Setting[];
  readonly onChangeSetting: (settingKey: string, newValue: boolean) => void;
}

export const MatchTableSettings = ({ onChangeSetting, settings }: Props) => {
  return (
    <div style={styles.container}>
      {settings.map((setting) => (
        <div key={`${setting.key}`} style={{ ...common.row }}>
          <Switch
            onChange={(newValue) => onChangeSetting(setting.key, newValue)}
            value={setting.value}
          />
          <Spacer width="15px" />
          <span>{setting.name}</span>
        </div>
      ))}
    </div>
  );
};
