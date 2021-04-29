import { resolve } from 'path';
import { readFile } from 'fs-extra';

/**
 * Get the current SDK version from the package json.
 * @returns The SDK version.
 */
export async function getSdkVersion(): Promise<string> {
  return JSON.parse(
    await readFile(resolve(__dirname, '../../package.json'), 'utf8')
  ).version;
}
