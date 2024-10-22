export function smallCardSizeAndColCnt(
  container: number,
  pad: number
): { width: number; colCount: number } {
  const w = (container > 600 ? 300 : container / 2) - pad;
  return {
    width: w,
    colCount: Math.max(2, Math.floor(container / w)),
  };
}
