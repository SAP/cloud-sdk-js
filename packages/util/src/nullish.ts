export function isNullish(x: any): x is null | undefined {
  return x === null || x === undefined;
}
