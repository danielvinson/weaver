import { CSSProperties, ReactNode } from "react";

interface Props {
  readonly children?: ReactNode;
  readonly style?: CSSProperties;
}

export const Row = ({ children, style }: Props) => (
  <div style={{ display: "flex", flexDirection: "row", ...style }}>{children}</div>
);
