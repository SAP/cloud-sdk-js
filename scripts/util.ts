import * as fs from 'fs';
import * as path from 'path';

export const version = JSON.parse(fs.readFileSync('lerna.json', 'utf8')).version;
export const docsDir = path.resolve('docs');
export const apiDocsDir = path.resolve(docsDir, 'api');

export function transformFile(filePath: string, tranformFn: (file: string) => string): void {
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  const transformedFile = tranformFn(file);
  fs.writeFileSync(filePath, transformedFile, { encoding: 'utf8' });
}
