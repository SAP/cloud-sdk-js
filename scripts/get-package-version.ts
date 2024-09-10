import { PathLike, readFileSync } from 'fs';

export function getPackageVersion(pathToRootPackageJson?: number | PathLike) {
  const packageJson = readFileSync(
    pathToRootPackageJson || 'package.json',
    'utf8'
  );
  return JSON.parse(packageJson).version as string;
}
