import fs from 'fs';
import { join } from 'path';

/**
 * Removes a directory and its corresponding sub-directories and files.
 * @param directoryPath - Path of the directory to unlink.
 */
export function recursiveRemove(directoryPath: string): void {
  if (
    fs.existsSync(directoryPath) &&
    fs.lstatSync(directoryPath).isDirectory()
  ) {
    fs.readdirSync(directoryPath).forEach(element => {
      const filePath = join(directoryPath, element);
      if (fs.lstatSync(filePath).isDirectory()) {
        recursiveRemove(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}
