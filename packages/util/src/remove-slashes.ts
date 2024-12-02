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
  return path.replace(/\/+$/, '');
}

/**
 * @internal
 */
export function removeLeadingSlashes(path: string): string {
  return path.replace(/^\/+/,'');
}

