import { existsSync, promises } from 'fs';
const { copyFile: fsCopyFile } = promises;

/**
 * Copy a file from a given path.
 * @param src - Path to the source file.
 * @param dest - Path to the destination file
 * @param overwrite - Whether or not existing files should be overwritten.
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
