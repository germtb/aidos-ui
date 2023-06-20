export function hash(source: string, modulus?: number): string {
  let hash = 0;
  let i: number;
  let chr: number;

  if (source.length === 0) {
    return hash.toString();
  }

  for (i = 0; i < source.length; i++) {
    chr = source.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  if (modulus) {
    return (Math.abs(hash) % modulus).toString(32);
  } else {
    return Math.abs(hash).toString(32);
  }
}
