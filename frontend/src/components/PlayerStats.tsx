import { PlayerName } from "./PlayerName";
import { RankIcon } from "./RankIcon";
import { Row } from "./Row";
import { Spacer } from "./Spacer";
import type { Player } from "../types/player";
import type { RankNumber } from "./RankIcon";

interface Props {
  readonly player: Player;
}

export const PlayerStats = ({ player }: Props) => {
  return (
    <Row>
      <span>Name: </span>
      <PlayerName name={player.name} tag={player.tag} />
      <Spacer width="15px" />
      <span>Rank:</span>
      <RankIcon rankNumber={player.rank as RankNumber} width={25} height={25} />
      <Spacer width="15px" />
      <span>RR: </span>
      <span>{player.rankedRating}</span>
    </Row>
  );
};
