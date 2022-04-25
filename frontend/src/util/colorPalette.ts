export const colors = {
  background: "#232224",
  blueTeam: "rgb(37, 92, 153)",
  blueTeamDarker1: "#245894",
  blueTeamDarker2: "#204E83",
  blueTeamDarker3: "#1C4473",
  gold: "rgb(231, 215, 193)",
  header: "rgb(73, 70, 74)",
  highlight: "rgb(156, 191, 231)",
  primary: "#CEE5F2",
  redTeam: "#B3001B",
  redTeamDarker1: "#A30018",
  redTeamDarker2: "#8F0015",
  redTeamDarker3: "#7A0012",
  secondary: "#ACCBE1",
  shadow: "#111111",
  white: "rgb(245, 240, 246)",
};

export const gradients = {
  blueTeamBackground: `linear-gradient(0deg, ${colors.blueTeamDarker2}, ${colors.blueTeamDarker1})`,
  inputBackground: `linear-gradient(90deg, ${colors.blueTeamDarker1}, ${colors.redTeamDarker1})`,
  mainBackground: `linear-gradient(90deg, ${colors.background}, ${colors.shadow}, ${colors.background})`,
  mainBackgroundVertical: `linear-gradient(0deg, ${colors.background}, ${colors.shadow}, ${colors.background})`,
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
  greenToRed2: [
    "#00F345",
    "#00EA00",
    "#37E200",
    "#80D900",
    "#BFD106",
    "#C89E0F",
    "#C06417",
    "#B73520",
    "#AF2840",
    "#D10636",
    "#F30034",
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
