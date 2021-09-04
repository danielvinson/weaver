export const colors = {
  background: "#232224",
  blueTeam: "#255C99",
  blueTeamDarker1: "#245894",
  blueTeamDarker2: "#204E83",
  blueTeamDarker3: "#1C4473",
  gold: "rgb(231, 215, 193)",
  header: "#49464a",
  highlight: "#9CBFE7",
  primary: "#CEE5F2",
  redTeam: "#B3001B",
  redTeamDarker1: "#A30018",
  redTeamDarker2: "#8F0015",
  redTeamDarker3: "#7A0012",
  secondary: "#ACCBE1",
  shadow: "#111111",
  white: "#F5F0F6", // 28, 68, 115
};

export const gradients = {
  blueTeamBackground: `linear-gradient(0deg, ${colors.blueTeamDarker2}, ${colors.blueTeamDarker1})`,
  mainBackground: `linear-gradient(90deg, ${colors.background}, ${colors.shadow}, ${colors.background})`,
  redTeamBackground: `linear-gradient(0deg, ${colors.redTeamDarker1}, ${colors.redTeam})`,
};

export const colorScales = {
  greenToRed: [
    "#003b09",
    "#10612c",
    "#228a51",
    "#4fb477",
    "#7fdda0",
    "#fbbeb4",
    "#f98375",
    "#e24944",
    "#b2201f",
    "#7b0000",
  ],
  neutralToGreen: [
    "#f2e7c9",
    "#e1e5b9",
    "#cfe2aa",
    "#bddf9a",
    "#abdc8a",
    "#97d97a",
    "#83d66a",
    "#6cd25a",
    "#51ce48",
    "#29ca35",
  ],
  neutralToRed: [
    "#fff8e8",
    "#ffe8c7",
    "#fdd2a8",
    "#f6b78d",
    "#ed9975",
    "#e07a61",
    "#d15b50",
    "#bf3d44",
    "#ac213b",
    "#990d35",
  ],
};

export const makeAlpha = (rgbColor: string, alpha: number) => {
  // messy but consistent... regex probably better
  const [r, g, b] = rgbColor.split("(")[1].split(")")[0].split(",");

  return `rgba(${r}, ${g}, ${b}, ${alpha}`;
};
