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
  { display: true, group: "basic", key: "rank", name: "Rank", width: "70px" },
  { display: true, group: "basic", key: "agent", name: "Agent", width: "70px" },
  {
    display: true,
    group: "basic",
    key: "combat",
    name: "Combat Score",
    width: "170px",
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
    display: true,
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
  { display: false, group: "basic", key: "kills", name: "K", width: "50px" },
  { display: false, group: "basic", key: "deaths", name: "D", width: "50px" },
  { display: false, group: "basic", key: "assists", name: "A", width: "50px" },
  { display: true, group: "basic", key: "kda", name: "KDA", width: "95px" },
  {
    display: false,
    group: "basic",
    key: "fd",
    name: "FD",
    tooltip: "First Deaths",
    width: "50px",
  },
  {
    display: true,
    group: "basic",
    key: "fk",
    name: "FK",
    tooltip: "First Kills",
    width: "50px",
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
    display: false,
    group: "eco",
    key: "ecoKills",
    name: "Eco Round Kills",
    tooltip: "Kills against players who were saving",
    width: "140px",
  },
  {
    display: false,
    group: "eco",
    key: "gunRoundKills",
    name: "Gun Round Kills",
    tooltip: "Kills against players who had a full buy",
    width: "140px",
  },
  {
    display: false,
    group: "eco",
    key: "pistolKills",
    name: "Pistol Round Kills",
    tooltip: "Kills on pistol rounds",
    width: "155px",
  },
  {
    display: false,
    group: "eco",
    key: "forceKills",
    name: "Force Round Kills",
    tooltip: "Kills against players who were force buying",
    width: "155px",
  },
  {
    display: false,
    group: "kast",
    key: "kastKills",
    name: "KAST Kills",
    tooltip: "Number of rounds which the player got a kill",
    width: "135px",
  },
  {
    display: false,
    group: "kast",
    key: "kastAssists",
    name: "KAST Assists",
    tooltip: "Number of rounds which the player got an assist but not a kill",
    width: "135px",
  },
  {
    display: false,
    group: "kast",
    key: "kastTrades",
    name: "KAST Trades",
    tooltip:
      "Number of rounds which the player did not get a kill or assist but was traded",
    width: "135px",
  },
  {
    display: false,
    group: "kast",
    key: "kastSurvived",
    name: "KAST Survived",
    tooltip:
      "Number of rounds which the player survived and did not get a kill or assist",
    width: "135px",
  },
  {
    display: true,
    group: "computed",
    key: "hsPercentBullet",
    name: "Headshot %",
    tooltip: "Percent of bullets which hit which were headshots",
    width: "120px",
  },
  {
    display: false,
    group: "computed",
    key: "hsPercentKill",
    name: "Headshot Kill %",
    tooltip: "Percent of kills which included a headshot",
    width: "140px",
  },
];
