/* eslint-disable jsdoc/require-jsdoc */

import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

export const apiDocsDir = resolve('knowledge-base', 'api-reference');

export async function transformFile(
  filePath: string,
  transformFn: CallableFunction
): Promise<void> {
  const file = await readFile(filePath, { encoding: 'utf8' });
  const transformedFile = await transformFn(file);
  await writeFile(filePath, transformedFile, { encoding: 'utf8' });
}
