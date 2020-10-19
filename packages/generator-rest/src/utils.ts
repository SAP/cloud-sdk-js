import {
  Directory, ImportDeclarationStructure,
  IndentationText,
  ModuleResolutionKind,
  ProjectOptions,
  QuoteKind,
  ScriptTarget, SourceFile,
  SourceFileStructure, StructureKind
} from 'ts-morph';
import { ModuleKind } from 'typescript';
import { ODataVersion, unique } from '@sap-cloud-sdk/util';

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

export function sourceFile(
  directory: Directory,
  relativePath: string,
  content: SourceFileStructure,
  overwrite: boolean
): SourceFile {
  const file = directory.createSourceFile(
    `${relativePath}.ts`,
    addFileComment(content),
    {
      overwrite
    }
  );

  file.formatText({ insertSpaceAfterCommaDelimiter: true });
  return file;
}

function addFileComment(content: SourceFileStructure): SourceFileStructure {
  content.leadingTrivia = [
    '/*',
    ' * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.',
    ' *',
    ' * This is a generated file powered by the SAP Cloud SDK for JavaScript.',
    ' */',
    ''
  ].join('\n');
  return content;
}

export function coreImportDeclaration(
  namedImports: string[]
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: '@sap-cloud-sdk/core',
    namedImports: unique(namedImports)
  };
}
