/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { VdmServiceMetadata } from '../../src/vdm-types';
import { orderBreakfast } from '../test-util/data-model';
import { importDeclarationsAction } from '../../src/action-function-import/import';

describe('function-import generation', () => {
  it('creates correct imports when there is an edm return types', () => {
    const service = {
      functionImports: [orderBreakfast]
    };

    expect(importDeclarationsAction(service as VdmServiceMetadata)).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'transformReturnValueForEdmTypeV2',
          'edmToTsV2',
          'FunctionImportRequestBuilderV2',
          'FunctionImportParameter'
        ]
      }
    ]);
  });
});
