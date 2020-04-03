/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import * as fs from 'fs';
import * as path from 'path';

export const version = JSON.parse(fs.readFileSync('lerna.json', 'utf8'))
  .version;
export const docsDir = path.resolve('docs');
export const apiDocsDir = path.resolve(docsDir, 'api');

export function transformFile(
  filePath: string,
  tranformFn: (file: string) => string
): void {
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  const transformedFile = tranformFn(file);
  fs.writeFileSync(filePath, transformedFile, { encoding: 'utf8' });
}

export function jsonStringify(json) {
  return JSON.stringify(json, null, 2) + '\n';
}

export function openFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}
