export const colors = {
  primary: "#CEE5F2",
  secondary: "#ACCBE1",

  background: "#333333",
  highlight: "#9CBFE7",

  shadow: "#111111",
  white: "#F5F0F6",

  redTeam: "#B3001B",
  redTeamDarker1: "#A30018",
  redTeamDarker2: "#8F0015",
  redTeamDarker3: "#7A0012",

  blueTeam: "#255C99",
  blueTeamDarker1: "#245894",
  blueTeamDarker2: "#204E83",
  blueTeamDarker3: "#1C4473",
};

export const gradients = {
  redTeamBackground: `linear-gradient(0deg, ${colors.redTeamDarker1}, ${colors.redTeam})`,
  blueTeamBackground: `linear-gradient(0deg, ${colors.blueTeamDarker2}, ${colors.blueTeamDarker1})`,
};
