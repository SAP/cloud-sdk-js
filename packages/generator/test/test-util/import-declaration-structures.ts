import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

/**
 * @internal
 */
export const momentImport = {
  kind: StructureKind.ImportDeclaration,
  moduleSpecifier: 'moment',
  namedImports: ['Moment']
} as ImportDeclarationStructure;

/**
 * @internal
 */
export const bigNumberImport = {
  kind: StructureKind.ImportDeclaration,
  moduleSpecifier: 'bignumber.js',
  namedImports: ['BigNumber']
} as ImportDeclarationStructure;
