import { StructureKind } from 'ts-morph';
import type { ImportDeclarationStructure } from 'ts-morph';

export const momentImport = {
  kind: StructureKind.ImportDeclaration,
  moduleSpecifier: 'moment',
  namedImports: ['Moment']
} as ImportDeclarationStructure;

export const bigNumberImport = {
  kind: StructureKind.ImportDeclaration,
  moduleSpecifier: 'bignumber.js',
  namedImports: ['BigNumber']
} as ImportDeclarationStructure;
