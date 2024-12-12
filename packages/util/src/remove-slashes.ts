/**
 * @internal
 */
export function removeSlashes(path: string): string {
  path = removeLeadingSlashes(path);
  path = removeTrailingSlashes(path);
  return path;
}

/**
 * @internal
 */
export function removeTrailingSlashes(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * @internal
 */
export function removeLeadingSlashes(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}
