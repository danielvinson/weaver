import { Header } from "./Header";
import { gradients } from "../util/colorPalette";
import type { CSSProperties, ReactNode } from "react";

const styles: Record<string, CSSProperties> = {
  container: {
    alignItems: "center",
    background: gradients.mainBackground,
    display: "flex",
    flexDirection: "column",

    height: "100vh",
    justifyContent: "flex-start",
    overflowX: "hidden",
    width: "100vw",
  },
  main: {},
};

interface Props {
  readonly activeRoute: string;
  readonly children: ReactNode;
}

export const DefaultLayout = ({ activeRoute, children }: Props) => {
  return (
    <div style={styles.container}>
      <Header activeRoute={activeRoute} />
      <div style={styles.main}>{children}</div>
    </div>
  );
};
