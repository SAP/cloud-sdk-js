import { existsSync, PathLike, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { createLogger } from './logger';

const logger = createLogger({
  package: 'util',
  messageContext: 'fs'
});

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

/**
 * Read a JSON file from the file system.
 * @param path The path to the JSON file.
 * @returns An object parsed from the JSON file.
 */
export function readJSON(path: PathLike): { [key: string]: any } {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf8'));
  }
  logger.warn(`File "${path}" does not exist, return empty object.`);
  return {};
}
