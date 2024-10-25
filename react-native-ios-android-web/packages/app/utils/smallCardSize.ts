export function smallCardSizeAndColCnt(
  container: number,
  pad: number
): { width: number; colCount: number } {
  let w = Math.min(275, (container / 2) - pad)
  let cols = Math.max(2, Math.floor(container / w))
  if (w > 209) {
    w = Math.min(275, (container - pad - pad * cols) / cols)
  }
  return { width: w, colCount: cols }
}
