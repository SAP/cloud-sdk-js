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
        kind: 16,
        moduleSpecifier: '@sap-cloud-sdk/odata-common/internal',
        namedImports: ['FunctionImportParameter']
      },
      {
        kind: 16,
        moduleSpecifier: '@sap-cloud-sdk/odata-v4',
        namedImports: [
          'edmToTs',
          'FunctionImportRequestBuilder',
          'DeSerializers',
          'transformReturnValueForEdmType',
          'DefaultDeSerializers',
          'defaultDeSerializers'
        ]
      },
      {
        kind: 16,
        moduleSpecifier: './service',
        namedImports: ['']
      }
    ]);
  });
});
