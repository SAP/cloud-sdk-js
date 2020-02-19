/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { lstatSync, PathLike, readdirSync } from 'fs';
import path from 'path';

const validFileExtensions = ['.edmx', '.xml'];

export function edmxPaths(input: PathLike): PathLike[] {
  if (lstatSync(input).isDirectory()) {
    return readdirSync(input)
      .map(f => edmxPaths(path.join(input.toString(), f)))
      .reduce((prev, curr) => {
        prev.push(...curr);
        return prev;
      }, []);
  } else {
    return hasEdmxFileExtension(input.toString()) ? [input] : [];
  }
}

export function inputPaths(input: PathLike, useSwagger: boolean): ServiceDefinitionPaths[] {
  return edmxPaths(input).map(edmxPath => {
    if (useSwagger) {
      const swaggerPath = swaggerPathForEdmx(edmxPath);
      if (swaggerPath) {
        return { edmxPath, swaggerPath };
      }
    }
    return { edmxPath };
  });
}

function swaggerPathForEdmx(edmxPath: PathLike): PathLike {
  return edmxPath.toString().replace(/\.edmx$/, '.json');
}

function hasEdmxFileExtension(fileName: string): boolean {
  return validFileExtensions.includes(path.extname(fileName.toLowerCase()));
}

export interface ServiceDefinitionPaths {
  edmxPath: PathLike;
  swaggerPath?: PathLike;
}
