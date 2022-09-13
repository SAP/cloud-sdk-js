import { PathLike, readFileSync } from "fs";

export const getPackageVersion = (pathToRootPackageJson?: number | PathLike) => JSON.parse(
  readFileSync(pathToRootPackageJson || 'package.json', 'utf8')
).version as string;
