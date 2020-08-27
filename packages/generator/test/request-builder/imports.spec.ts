/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { importDeclarations } from '../../src/request-builder';
import { breakfastEntity } from '../test-util/data-model';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(breakfastEntity, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'Time',
          'RequestBuilder',
          'GetAllRequestBuilderV2',
          'GetByKeyRequestBuilderV2',
          'CreateRequestBuilderV2',
          'UpdateRequestBuilderV2'
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        namedImports: ['Breakfast'],
        moduleSpecifier: './Breakfast'
      }
    ]);
  });
});
