import { MatchTable } from "../components/MatchTable";
import { useParams } from "react-router-dom";

const testUUID = "8af8c964-4736-492f-b90d-daf7ef12a400";
const testUUID2 = "3598516c-c1a3-4dbb-93a3-af5943b0cefa";

interface Params {
  readonly matchId: string;
}

export const MatchDetail = () => {
  const { matchId } = useParams<Params>();

  return <MatchTable matchId={matchId} />;
};
