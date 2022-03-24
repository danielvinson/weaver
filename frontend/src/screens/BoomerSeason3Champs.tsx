import { TournamentStatTable } from "../components/TournamentStatTable/TournamentStatTable";
import match1 from "../data/boomerSeason3/championship/0f58c00e-31a9-4dc6-8104-0a88c056cf98.json";
import match2 from "../data/boomerSeason3/championship/15fb585d-9775-4601-9db9-f990b3ca89f1.json";
import match3 from "../data/boomerSeason3/championship/285c2815-4f34-48cc-94e6-a552efffa898.json";
import match4 from "../data/boomerSeason3/championship/5a290a98-4543-47e0-ae77-f1172960fc36.json";
import match5 from "../data/boomerSeason3/championship/83c6b049-2c40-40fc-b360-908d9d21452f.json";
import match6 from "../data/boomerSeason3/championship/c770095d-9a47-46ad-ab1f-f2045db51e10.json";
import match7 from "../data/boomerSeason3/championship/fe415513-bf92-4760-9f5d-1821756027f8.json";

import type { Match } from "../types/match";

export interface SavedMatchFile {
  readonly match_type: string; //"puuid" | "subject";
  readonly data: Match;
}

const MATCHES: SavedMatchFile[] = [
  match1,
  match2,
  match3,
  match4,
  match5,
  match6,
  match7,
];

export const BoomerSeason3Stats = () => {
  const data = MATCHES.map((match) => match.data);

  return (
    <div>
      <span style={{ color: "white", fontSize: "1.2em", padding: "15px" }}>
        Boomerants: Season 3 Championship Stats
      </span>

      <TournamentStatTable matches={data} />
    </div>
  );
};
