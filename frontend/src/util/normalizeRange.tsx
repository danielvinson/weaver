export const normalizeRange = (
  oldValue: number,
  oMin: number,
  oMax: number,
  nMin: number,
  nMax: number
): number => {
  const num = (((oldValue - oMin) / (oMax - oMin)) * (nMax - nMin) + nMin);
  return Math.round(num);
};
