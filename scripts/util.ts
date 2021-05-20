import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import execa = require('execa');

export const version = JSON.parse(readFileSync('lerna.json', 'utf8')).version;
export const docsDir = resolve('docs');
export const apiDocsDir = resolve(docsDir, 'api');

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

export async function getAllLernaModules(): Promise<LernaModule[]> {
  const response = await execa('lerna', ['list', '--json', '-a'], {
    cwd: resolve(__dirname, '../')
  });
  return JSON.parse(response.stdout) as LernaModule[];
}

export async function getProductiveLernaModules(): Promise<LernaModule[]> {
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
