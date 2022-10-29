export function filesize(input: string) {
  const bytes = Number(input);
  if (bytes < 1024) {
    return `${formatNumber(bytes)} Bytes`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${formatNumber(kb)} Kb`;
  }
  const mb = kb / 1024;
  if (mb < 1024) {
    return `${formatNumber(mb)} Mb`;
  }
  const gb = mb / 1024;
  if (gb < 1024) {
    return `${formatNumber(gb)} Gb`;
  }
}

function formatNumber(value: number): string {
  return Intl.NumberFormat('de', {maximumFractionDigits: 2, minimumFractionDigits: 2}).format(value);
}
