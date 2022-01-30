import { TournamentStatTable } from "../components/TournamentStatTable/TournamentStatTable";
import match1 from "../data/charityTournament/32381d57-9dd5-4b82-abe6-dbf03df551f3.json";
import match10 from "../data/charityTournament/f5a38e05-5932-4ece-afd5-b0c7a78d1f57.json";
import match11 from "../data/charityTournament/a803c12f-54cb-4b29-bcc1-a331d7790147.json";
import match12 from "../data/charityTournament/f0bf588e-f196-4f98-b121-1ff883397e62.json";
import match13 from "../data/charityTournament/1f22e64c-8ac5-4ccd-8b46-8b4fc0aefa5c.json";
import match14 from "../data/charityTournament/62a7bd58-2aab-4a22-94b6-1f1f3880d5f3.json";
import match15 from "../data/charityTournament/af5cff67-6d41-411b-9a73-2d329a12e6e3.json";
import match16 from "../data/charityTournament/a5ab6ebb-d28d-404a-8254-a1dcdf35cb3e.json";
import match17 from "../data/charityTournament/e82a3070-89fd-4848-a306-2ce8bbd41209.json";
import match18 from "../data/charityTournament/7b24970a-6a31-43a3-ada1-e6c63bfaebb6.json";
import match19 from "../data/charityTournament/1be5df25-7737-45b2-ae26-0cbc8db008ff.json";
import match2 from "../data/charityTournament/8d3cb17a-fb9b-43a1-b10f-d9d7bf36e126.json";
import match20 from "../data/charityTournament/db0a33d0-d7b6-4f0f-8942-1ba5fa177a19.json";
import match21 from "../data/charityTournament/a4547830-ec78-4b1a-ab93-aee1a0411f9e.json";
import match22 from "../data/charityTournament/86a38664-924e-4ffd-90bd-b2e8e6c36d98.json";
import match23 from "../data/charityTournament/e0efe805-b846-4926-8500-3c4235dc913b.json";
import match24 from "../data/charityTournament/0091df56-bc6e-440d-afe9-8f5fcd66cda4.json";
import match25 from "../data/charityTournament/756d56ff-404f-4430-8fef-69144996ad91.json";
import match26 from "../data/charityTournament/e4324a56-acd5-4d1f-b3c6-620353c51773.json";
import match27 from "../data/charityTournament/9e878bd2-aa89-4a25-bf02-274d372536d1.json";
import match28 from "../data/charityTournament/2ec16c21-7bc0-464b-be7b-2d3c82278b1e.json";
import match29 from "../data/charityTournament/37bf6b57-a001-44fb-b42a-4c1782c0054c.json";
import match3 from "../data/charityTournament/82a246e8-1151-42a1-82bb-36543d0b31dd.json";
import match30 from "../data/charityTournament/ebd7bc41-64c5-4138-9ff5-916592cbd119.json";
import match31 from "../data/charityTournament/17515786-e155-45d7-a9f2-1461ab507516.json";
import match32 from "../data/charityTournament/d257a497-f39a-4517-9daf-0f4c165d01fa.json";
import match33 from "../data/charityTournament/2c13d70a-07a0-499b-8af9-c9bc5f26ae1b.json";
import match4 from "../data/charityTournament/e48cba19-c7a8-47fe-8f93-9f179e19f858.json";
import match5 from "../data/charityTournament/46e576ef-ebf0-4e41-81ff-91f575ab72f2.json";
import match6 from "../data/charityTournament/b4fd5353-a21c-4b67-8a0d-b6d62a8710a7.json";
import match7 from "../data/charityTournament/68bae568-7906-4230-a362-376e516498f6.json";
import match8 from "../data/charityTournament/86cdfce1-1a7e-4d4a-8b00-1e84dd1f9fbc.json";
import match9 from "../data/charityTournament/5850f8f0-3278-4804-85ad-6fa16b8ab32c.json";
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
  match8,
  match9,
  match10,
  match11,
  match12,
  match13,
  match14,
  match15,
  match16,
  match17,
  match18,
  match19,
  match20,
  match21,
  match22,
  match23,
  match24,
  match25,
  match26,
  match27,
  match28,
  match29,
  match30,
  match31,
  match32,
  match33,
];

export const BoomerCharityTournament = () => {
  const data = MATCHES.map((match) => match.data);
  return (
    <div>
      <span style={{ color: "white", fontSize: "1.2em", padding: "15px" }}>
        Boomerants: Winter Boomerland Stats
      </span>
      <TournamentStatTable matches={data} />
    </div>
  );
};
