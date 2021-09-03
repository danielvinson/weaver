import { CSSProperties, ReactNode } from "react";
import { colors } from "../util/colorPalette";
import { Header } from "./Header";

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: colors.background,
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
  },
}

interface Props {
  readonly children: ReactNode;
}

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div style={styles.container}>
      <Header />
      {children}
    </div>
  )
}
