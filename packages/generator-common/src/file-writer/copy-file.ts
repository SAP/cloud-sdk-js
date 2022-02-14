import { existsSync, promises } from 'fs';
import { basename, join, resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
const { copyFile: fsCopyFile } = promises;

const logger = createLogger('generator-common');

/**
 * Copy a file from a given path.
 * @param src - Path to the source file.
 * @param dest - Path to the destination file
 * @param overwrite - Whether or not existing files should be overwritten.
 * @internal
 */
export async function copyFile(
  src: string,
  dest: string,
  overwrite = false
): Promise<void> {
  if (!overwrite && existsSync(dest)) {
    return;
  }
  return fsCopyFile(src, dest);
}

/**
 * @param files - List of files to be copied
 * @param dest - Path to where the files are copied
 * @param overwrite - Overwrite flag
 * @internal
 */
export async function copyFiles(
  files: string[],
  dest: string,
  overwrite: boolean
): Promise<void[]> {
  logger.verbose(`Copying additional files ${files} into ${dest}.`);

  return Promise.all(
    files.map(filePath =>
      copyFile(resolve(filePath), join(dest, basename(filePath)), overwrite)
    )
  );
}
