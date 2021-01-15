import { existsSync, PathLike, readdirSync, readFileSync, rmdir } from 'fs';
import { resolve } from 'path';
import { Directory } from 'ts-morph';
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

export function transpileDirectory(
  pathOrDir: string | Directory
): Promise<void> {
  let path: string;
  if (pathOrDir instanceof Directory) {
    path = pathOrDir.getPath();
  } else {
    path = pathOrDir;
  }
  logger.info(`Transpiling files in the directory: ${path} started.`);
  return execa('tsc', { cwd: path })
    .then(() => {
      logger.info(`Transpiling files in directory: ${path} finished.`);
    })
    .catch(err => {
      console.error('Error in transpiling catched' + JSON.stringify(err))
      logger.error(`Error: Failed to generate js files: ${err}`);
      process.exit(1);
    });
}

export function deleteDirectory(path: string): Promise<void> {
  function callBackk(
    err: Error | null,
    res: () => void,
    rej: (reason: any) => void
  ) {
    if (err) {
      rej(`Error in deleting: ${path} with ${err.message}`);
    } else {
      res();
    }
  }

  return new Promise<void>((res, rej) => {
    rmdir(path, { recursive: true }, err => callBackk(err, res, rej));
  });
}
