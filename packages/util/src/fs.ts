/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { readdirSync } from 'fs';
import { resolve } from 'path';

export function findProjectRoot(path: string, lastPath: string = path): string {
  if (!path) {
    return lastPath;
  }

  const inProject =
    readdirSync(path).includes('package.json') ||
    readdirSync(path).includes('node_modules') ||
    path.includes('node_modules');
  if (!inProject) {
    return lastPath;
  }

  return findProjectRoot(resolve(path, '..'), path);
}
