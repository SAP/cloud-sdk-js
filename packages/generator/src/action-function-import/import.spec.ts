import { VdmServiceMetadata } from '../vdm-types';
import { orderBreakfast } from '../../test/test-util/data-model';
import { importDeclarationsAction } from './import';

describe('action-import generation', () => {
  it('creates correct imports when there is an EDM return types', () => {
    const service = {
    };

    expect(importDeclarationsAction(service as VdmServiceMetadata, [orderBreakfast])).toEqual([
      {
        kind: 16,
        moduleSpecifier: '@sap-cloud-sdk/odata-v4',
        namedImports: [
          'edmToTs',
          'ActionImportRequestBuilder',
          'ActionImportParameter',
          'transformReturnValueForEdmType',
          'DeSerializers',
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
