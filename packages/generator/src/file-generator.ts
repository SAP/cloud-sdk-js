import { parse } from 'path';
import { createFile } from '@sap-cloud-sdk/generator-common/internal';
import type { Directory, SourceFile, SourceFileStructure } from 'ts-morph';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export async function sourceFile(
  directory: Directory,
  relativePath: string,
  content: SourceFileStructure | string,
  options: CreateFileOptions
): Promise<SourceFile> {
  const file = directory.createSourceFile(`${relativePath}.ts`, content, {
    overwrite: options.overwrite
  });
  file.formatText({ insertSpaceAfterCommaDelimiter: true });

  const { base, dir } = parse(file.getFilePath());

  await createFile(dir, base, file.getFullText(), options);
  return file;
}
