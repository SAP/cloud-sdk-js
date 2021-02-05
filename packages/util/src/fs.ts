import { existsSync, PathLike, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import execa from 'execa';
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

/**
 * Executes the type script compiler for the given directory.
 * A valid tsconfig.json needs to be present in the directory.
 * @param path - Directory to be compiled
 */
export async function transpileDirectory(path: string): Promise<void> {
  logger.debug(`Transpiling files in the directory: ${path} started.`);
  await execa('tsc', { cwd: path }).catch(err => {
    logger.error(`Error: Failed to generate js files: ${err}`);
    process.exit(1);
  });
  logger.debug(`Transpiling files in directory: ${path} finished.`);
}
