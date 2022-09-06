import { readFileSync } from 'fs';

/**
 * @deprecated Use `getPackageVersion` in "get-package-version.ts" instead.
 * This function relies on the `process.cmd()` for searching the `package.json`.
 * It means, if the const or this file is imported from any locations that no `package.json` can be found, an error is thrown.
 * This makes the tests impossible, as the mock is not reached.
 * Also, as a const, no extensions can be applied.
 */
export const currentSdkVersion = JSON.parse(
  readFileSync('package.json', 'utf8')
).version as string;
