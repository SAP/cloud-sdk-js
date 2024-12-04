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
  while (path.endsWith('/')) {
    path = path.endsWith('/') ? path.slice(0, -1) : path;
  }
  return path;
}

/**
 * @internal
 */
export function removeLeadingSlashes(path: string): string {
  while (path.startsWith('/')) {
    path = path.startsWith('/') ? path.slice(1) : path;
  }
  return path;
}
