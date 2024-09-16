import { PathLike } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function getPackageVersion(
  pathToRootPackageJson?: PathLike
): Promise<string> {
  const packageJson = await readFile(
    pathToRootPackageJson || 'package.json',
    'utf8'
  );
  return JSON.parse(packageJson).version;
}
