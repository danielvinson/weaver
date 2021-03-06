// Ordered - order is added by func on load
export const defaultTableHeaders = [
  { display: false, group: "dev", key: "id", name: "ID", width: "auto" },
  { display: false, group: "dev", key: "team", name: "Team", width: "auto" },
  {
    display: true,
    group: "basic",
    key: "name",
    name: "Name",
    width: "minmax(125px, 250px)",
  },
  { display: false, group: "dev", key: "tag", name: "Tag", width: "auto" },
  {
    display: true,
    group: "basic",
    key: "gamesPlayed",
    name: "Games",
    tooltip: "Number of games played",
    width: "70px",
  },
  {
    display: true,
    group: "basic",
    key: "agents",
    name: "Agents",
    tooltip: "Agents played",
    width: "120px",
  },
  {
    display: true,
    group: "basic",
    key: "combat",
    name: "ACS",
    width: "100px",
  },
  {
    display: false,
    group: "computed",
    key: "rws",
    name: "RWCS",
    tooltip:
      "Round Win Combat Score calculated by average combat scores for only rounds which that player's team won",
    width: "90px",
  },
  {
    display: false,
    group: "computed",
    key: "wrws",
    name: "WRWCS",
    tooltip:
      "Weighted Round Win Combat Score calculated by average combat scores for only rounds which that player's team won, weighted to make kills on pistol rounds and against full buys more valuable.",
    width: "90px",
  },
  {
    display: false,
    group: "computed",
    key: "agentWeightedAcs",
    name: "AWACS",
    tooltip:
      "Combat Score normalized agent using by a weight based on statistics from pro play",
    width: "auto",
  },
  {
    display: false,
    group: "computed",
    key: "agentWeightedWrwcs",
    name: "AW-WRWACS",
    tooltip: "Agent-weighted WRWCS",
    width: "auto",
  },
  {
    display: false,
    group: "basic",
    key: "killsAvg",
    name: "Kills (Average)",
    width: "80px",
  },
  {
    display: false,
    group: "basic",
    key: "deathsAvg",
    name: "Deaths (Average)",
    width: "80px",
  },
  {
    display: false,
    group: "basic",
    key: "assistsAvg",
    name: "Assists (Average)",
    width: "80px",
  },
  {
    display: true,
    group: "basic",
    key: "killsTotal",
    name: "Kills",
    tooltip: "Total Kills",
    width: "60px",
  },
  {
    display: true,
    group: "basic",
    key: "deathsTotal",
    name: "Deaths",
    tooltip: "Total Deaths",
    width: "60px",
  },
  {
    display: true,
    group: "basic",
    key: "assistsTotal",
    name: "Assists",
    tooltip: "Total Assists",
    width: "60px",
  },
  {
    display: false,
    group: "basic",
    key: "fkTotal",
    name: "FK (Total)",
    tooltip: "First Kills",
    width: "80px",
  },
  {
    display: false,
    group: "basic",
    key: "fkAvg",
    name: "FK (Average)",
    tooltip: "First Kills",
    width: "60px",
  },
  {
    display: false,
    group: "basic",
    key: "fdTotal",
    name: "FD (Total)",
    tooltip: "First Deaths (Total)",
    width: "60px",
  },
  {
    display: false,
    group: "basic",
    key: "fdAvg",
    name: "FD (Average)",
    tooltip: "First Deaths (Average)",
    width: "80px",
  },
  {
    display: true,
    group: "basic",
    key: "fkDiff",
    name: "FK/FD Diff",
    tooltip: "Difference between first kills and first deaths",
    width: "110px",
  },
  {
    display: true,
    group: "clutch",
    key: "clutch",
    name: "Clutches",
    width: "auto",
  },
  {
    display: true,
    group: "clutch",
    key: "clutchv1",
    name: "1v1",
    width: "auto",
  },
  {
    display: true,
    group: "clutch",
    key: "clutchv2",
    name: "1v2",
    width: "auto",
  },
  {
    display: true,
    group: "clutch",
    key: "clutchv3",
    name: "1v3",
    width: "auto",
  },
  {
    display: true,
    group: "clutch",
    key: "clutchv4",
    name: "1v4",
    width: "auto",
  },
  {
    display: true,
    group: "clutch",
    key: "clutchv5",
    name: "1v5",
    width: "auto",
  },
  {
    display: true,
    group: "kast",
    key: "kast",
    name: "KAST",
    tooltip:
      "Percentage of rounds where the player got a kill, got an assist, survived, or was traded",
    width: "auto",
  },
  {
    display: false,
    group: "multi",
    key: "multiKillsAvg",
    name: "Multikills (Average)",
    tooltip: "Average Multikill Rounds",
    width: "120px",
  },
  {
    display: false,
    group: "multi",
    key: "multiKillsTotal",
    name: "Multikills (Total)",
    tooltip: "Total Multikill Rounds",
    width: "auto",
  },
  {
    display: true,
    group: "multi",
    key: "multiKills1",
    name: "1k",
    tooltip: "Single Kill Rounds",
    width: "auto",
  },
  {
    display: true,
    group: "multi",
    key: "multiKills2",
    name: "2k",
    tooltip: "Double Kill Rounds",
    width: "auto",
  },
  {
    display: true,
    group: "multi",
    key: "multiKills3",
    name: "3k",
    tooltip: "Triple Kill Rounds",
    width: "auto",
  },
  {
    display: true,
    group: "multi",
    key: "multiKills4",
    name: "4k",
    tooltip: "Quadra Kill Rounds",
    width: "auto",
  },
  {
    display: true,
    group: "multi",
    key: "multiKills5",
    name: "5k",
    tooltip: "Penta Kill Rounds",
    width: "auto",
  },
  {
    display: true,
    group: "computed",
    key: "hsPercent",
    name: "Headshot %",
    tooltip: "Percent of bullets which hit which were headshots",
    width: "120px",
  },
  {
    display: true,
    group: "basic",
    key: "plants",
    name: "Plants",
    tooltip: "Total number of plants",
    width: "70px",
  },
  {
    display: true,
    group: "basic",
    key: "defuses",
    name: "Defuses",
    tooltip: "Total number of defuses",
    width: "70px",
  },
];
