/**
 * @internal
 * Utility function to remove a single leading and trailing slash from a path.
 */
export function removeSlashes(path: string): string {
  path = removeLeadingSlashes(path);
  path = removeTrailingSlashes(path);
  return path;
}

/**
 * @internal
 * Utility function to remove a single trailing slash from a path.
 */
export function removeTrailingSlashes(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * @internal
 * Utility function to remove a single leading slash from a path.
 */
export function removeLeadingSlashes(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}
