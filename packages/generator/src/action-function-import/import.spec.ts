import { orderBreakfast } from '../../test/test-util/data-model';
import { VdmServiceMetadata } from '../vdm-types';
import { operationImportDeclarations } from './import';

describe('function / action-import generation', () => {
  it('creates correct imports for an action when there is an EDM return type', () => {
    const service = {
    };

    const actual = importDeclarationsAction(service as VdmServiceMetadata, [orderBreakfast]);

    expect(actual).toEqual([
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

  it('creates correct imports for function when there is an EDM return types', () => {
    const service = {
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
          'FunctionImportRequestBuilder'
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
