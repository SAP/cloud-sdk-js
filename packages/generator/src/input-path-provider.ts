import { lstatSync, PathLike, readdirSync } from 'fs';
import { join, extname } from 'path';

const validFileExtensions = ['.edmx', '.xml'];

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

export function swaggerPathForEdmx(edmxPath: PathLike): PathLike {
  const extension = new RegExp(`${extname(edmxPath.toString())}\$`);
  return edmxPath.toString().replace(extension, '.json');
}

function hasEdmxFileExtension(fileName: string): boolean {
  return validFileExtensions.includes(extname(fileName.toLowerCase()));
}

export interface ServiceDefinitionPaths {
  edmxPath: PathLike;
  swaggerPath?: PathLike;
}
