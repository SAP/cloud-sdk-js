import { promises } from 'fs';
import { join } from 'path';
import { codeBlock } from '@sap-cloud-sdk/util';
const { writeFile, mkdir, rmdir } = promises;

export function createDirectory(directoryPath: string): Promise<void> {
  return mkdir(directoryPath, { recursive: true });
}

export function createFile(
  directoryPath: string,
  fileName: string,
  content: string,
  overwrite: boolean
): Promise<void> {
  return writeFile(join(directoryPath, fileName), wrapContent(content), {
    encoding: 'utf8',
    flag: overwrite ? 'w' : 'wx'
  });
}

function wrapContent(content: string): string {
  return (
    codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
${content}
` + '\n'
  );
}

export function cleanDirectory(directoryPath: string): Promise<void> {
  return rmdir(directoryPath, { recursive: true });
}
