import { promises } from 'fs';
import {
  IndentationText,
  ModuleResolutionKind,
  ProjectOptions,
  QuoteKind,
  ScriptTarget
} from 'ts-morph';
import { ModuleKind } from 'typescript';
import { codeBlock } from '@sap-cloud-sdk/util';
const { writeFile, mkdir } = promises;
import { join } from 'path';

export function projectOptions(): ProjectOptions {
  return {
    addFilesFromTsConfig: false,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
      quoteKind: QuoteKind.Single
    },
    compilerOptions: {
      target: ScriptTarget.ES5,
      module: ModuleKind.CommonJS,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      diagnostics: true,
      moduleResolution: ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      inlineSources: false,
      noImplicitAny: true
    }
  };
}

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
