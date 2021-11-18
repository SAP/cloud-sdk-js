import { lstatSync, PathLike, readdirSync, existsSync } from 'fs';
import { join, extname, parse } from 'path';

const validFileExtensions = ['.edmx', '.xml'];
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function edmxPaths(input: PathLike): PathLike[] {
  if (lstatSync(input).isDirectory()) {
    return readdirSync(input)
      .map(f => edmxPaths(join(input.toString(), f)))
      .reduce((prev, curr) => {
        prev.push(...curr);
        return prev;
      }, []);
  }
  return hasEdmxFileExtension(input.toString()) ? [input] : [];
}
/**
 * @internal
 */
export function inputPaths(
  input: PathLike,
  useSwagger: boolean
): ServiceDefinitionPaths[] {
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
/**
 * @internal
 */
export function swaggerPathForEdmx(edmxPath: PathLike): PathLike | undefined {
  const { dir, name } = parse(edmxPath.toString());
  const validSwaggerExtensions = ['.json', '.JSON'];
  return validSwaggerExtensions
    .map(ext => join(dir, `${name}${ext}`))
    .find(swaggerPath => existsSync(swaggerPath.toString()));
}

function hasEdmxFileExtension(fileName: string): boolean {
  return validFileExtensions.includes(extname(fileName.toLowerCase()));
}
/**
 * @internal
 */
export interface ServiceDefinitionPaths {
  edmxPath: PathLike;
  swaggerPath?: PathLike;
}
