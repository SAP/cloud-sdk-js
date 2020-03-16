/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function removeSlashes(path: string): string {
  path = removeLeadingSlashes(path);
  path = removeTrailingSlashes(path);
  return path;
}

/**
 * @hidden
 */
export function removeTrailingSlashes(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * @hidden
 */
export function removeLeadingSlashes(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}
