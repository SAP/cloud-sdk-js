/* eslint-disable jsdoc/require-jsdoc */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
export const apiDocsDir = resolve('docs', 'api');

export function transformFile(
  filePath: string,
  tranformFn: CallableFunction
): void {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const transformedFile = tranformFn(file);
  writeFileSync(filePath, transformedFile, { encoding: 'utf8' });
}

export function openFile(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}
