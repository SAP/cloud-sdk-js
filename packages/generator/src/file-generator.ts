import { parse } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { Directory, SourceFile, SourceFileStructure } from 'ts-morph';
import { createFile } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export async function sourceFile(
  directory: Directory,
  relativePath: string,
  content: SourceFileStructure,
  overwrite: boolean
): Promise<SourceFile> {
  const file = directory.createSourceFile(`${relativePath}.ts`, content, {
    overwrite
  });
  file.formatText({ insertSpaceAfterCommaDelimiter: true });

  const { base, dir } = parse(file.getFilePath());
  await createFile(dir, base, file.getFullText(), overwrite, true);
  return file;
}
