import { StructureKind } from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';
import { orderBreakfast } from '../../test/test-util/data-model';
import { importDeclarationsAction } from './import';

describe('function-import generation', () => {
  it('creates correct imports when there is an EDM return types', () => {
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
