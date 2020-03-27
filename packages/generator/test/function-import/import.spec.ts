/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { importDeclarations } from '../../src/function-import/import';
import { VdmServiceMetadata } from '../../src/vdm-types';
import { orderBreakfast } from '../test-util/data-model';

describe('function-import generation', () => {
  it('creates correct imports when there is an edm return types', () => {
    const service = {
      functionImports: [orderBreakfast]
    };

    expect(importDeclarations(service as VdmServiceMetadata)).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'transformReturnValueForEdmType',
          'edmToTs',
          'FunctionImportRequestBuilder',
          'FunctionImportParameter'
        ]
      }
    ]);
  });
});
