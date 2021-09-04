interface Props {
  readonly width?: string;
  readonly height?: string;
}
export const Spacer = ({ height = "0", width = "0" }: Props) => (
  <div style={{ height, width }} />
);
