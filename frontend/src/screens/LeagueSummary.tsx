

interface TeamPlayer {
  readonly isCaptain: boolean;
  readonly valorantName: string;
  readonly valorantTag: string;
  readonly discordName: string;
  readonly discordTag: string;
}

interface Team {
  readonly name: string;
  readonly players: TeamPlayer[];
}

interface Props {
  readonly teams: Team[];
}

export const League = ({ teams }: Props) => <div />;
