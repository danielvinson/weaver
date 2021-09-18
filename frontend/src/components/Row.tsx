import { common } from "../util/styles";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}

export const Row = ({ children, style }: Props) => (
  <div style={{ ...common.row, ...style }}>{children}</div>
);
