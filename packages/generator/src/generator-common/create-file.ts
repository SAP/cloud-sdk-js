import { join } from 'path';
import { promises } from 'fs';
import { codeBlock, ErrorWithCause, unixEOL } from '@sap-cloud-sdk/util';

const { writeFile } = promises;
/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export async function createFile(
  directoryPath: string,
  fileName: string,
  content: string,
  overwrite: boolean,
  withCopyright = true
): Promise<void> {
  try {
    return await writeFile(
      join(directoryPath, fileName),
      withCopyright ? wrapContent(content) : content,
      {
        encoding: 'utf8',
        flag: overwrite ? 'w' : 'wx'
      }
    );
  } catch (err) {
    const recommendation =
      err.code === 'EEXIST' && !overwrite
        ? ' File already exists. If you want to allow overwriting files, enable the `overwrite` flag.'
        : '';
    throw new ErrorWithCause(
      `Could not write file "${fileName}".${recommendation}`,
      err
    );
  }
}

function wrapContent(content: string): string {
  return (
    codeBlock`
${getCopyrightHeader()}
${content}
` + unixEOL
  );
}

function getCopyrightHeader(): string {
  return codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
 `;
}
