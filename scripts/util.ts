import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import execa = require('execa');

export const version = JSON.parse(readFileSync('lerna.json', 'utf8')).version;
export const docsDir = resolve('docs');
export const apiDocsDir = resolve(docsDir, 'api');

export function transformFile(filePath, tranformFn) {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const transformedFile = tranformFn(file);
  writeFileSync(filePath, transformedFile, { encoding: 'utf8' });
}

export function jsonStringify(json) {
  return JSON.stringify(json, null, 2) + '\n';
}

export function openFile(filePath) {
  return readFileSync(filePath, { encoding: 'utf8' });
}

export async function getAllLernaModules(): Promise<LernaModule[]> {
  const response = await execa('lerna', ['list', '--json', '-a'], {
    cwd: resolve(__dirname, '../')
  });
  return JSON.parse(response.stdout) as LernaModule[];
}

export async function getNonTestLernaModules(): Promise<LernaModule[]> {
  return (await getAllLernaModules()).filter(
    module => !module.location.includes('test-packages')
  );
}

interface LernaModule {
  name: string;
  version: string;
  private: boolean;
  location: string;
}
