import { VdmServiceMetadata } from '../vdm-types';
import { orderBreakfast } from '../../test/test-util/data-model';
import { operationImportDeclarations } from './import';

describe('function-import generation', () => {
  it('creates correct imports when there is an EDM return types', () => {
    const service = {
      functionImports: [orderBreakfast]
    };

    expect(
      operationImportDeclarations(service as VdmServiceMetadata, 'function', [
        orderBreakfast
      ])
    ).toEqual([
      {
        kind: 16,
        moduleSpecifier: '@sap-cloud-sdk/odata-v4',
        namedImports: [
          'edmToTs',
          'transformReturnValueForEdmType',
          'DeSerializers',
          'DefaultDeSerializers',
          'defaultDeSerializers',
          'FunctionImportParameter',
          'FunctionImportRequestBuilder',
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
