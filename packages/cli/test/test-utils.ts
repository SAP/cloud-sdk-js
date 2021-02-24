/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { existsSync, mkdirSync, rmdir } from 'fs';
import { resolve as resolvePath, basename } from 'path';
import rm from 'rimraf';
import { ErrnoException } from 'fast-glob/out/types';
import { testOutputRootDir } from '../../../test-resources/cli';

export function getTestOutputDir(file: string): string {
  const outputDirName = basename(file, '.ts').split('.').join('-');

  return resolvePath(testOutputRootDir, outputDirName);
}

export async function getCleanProjectDir(
  pathPrefix: string,
  name: string
): Promise<string> {
  const projectDir = resolvePath(pathPrefix, name);
  if (existsSync(projectDir)) {
    await deleteAsync(projectDir, 3);
  }
  mkdirSync(projectDir, { recursive: true });
  return projectDir;
}

function getMajorNodeVersion(): number {
  const nodeVersion = process.version.match(/v(\d+)\./);
  if (nodeVersion && typeof nodeVersion[1] === 'number') {
    return nodeVersion[1];
  }
  return -1;
}

export async function deleteAsync(
  dirPath: string,
  busyRetries: number
): Promise<void> {
  // We found that rimraf sync is not really stable and trust the build in fs methods more
  // So if possible i.e. node 12 or greater we use them.
  if (getMajorNodeVersion() >= 12) {
    return new Promise<void>((resolve, reject) =>
      rmdir(dirPath, { maxRetries: busyRetries, recursive: true }, err =>
        callBackk(err, resolve, reject)
      )
    );
  }

  return new Promise<void>((resolve, reject) => {
    rm(dirPath, { maxBusyTries: busyRetries }, err =>
      callBackk(err, resolve, reject)
    );
  });

  function callBackk(
    err: Error | ErrnoException | null,
    resolve: () => void,
    reject: (reason: any) => void
  ) {
    if (err) {
      reject(`Error in deleting: ${dirPath} with ${err.message}`);
    } else {
      resolve();
    }
  }
}

export enum TimeThresholds {
  EXTRA_SHORT = 10000,
  SHORT = 30000,
  MEDIUM = 90000,
  LONG = 240000,
  EXTRA_LONG = 480000
}
