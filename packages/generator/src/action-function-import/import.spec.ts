import { orderBreakfast } from '../../test/test-util/data-model';
import { VdmServiceMetadata } from '../vdm-types';
import { importDeclarationsAction, importDeclarationsFunction } from './import';

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

    const actual = importDeclarationsFunction(service as VdmServiceMetadata, [orderBreakfast]);

    expect(actual).toEqual([
      {
        kind: 16,
        moduleSpecifier: '@sap-cloud-sdk/odata-v4',
        namedImports: [
          'edmToTs',
          'FunctionImportRequestBuilder',
          'DeSerializers',
          'transformReturnValueForEdmType',
          'DefaultDeSerializers',
          'defaultDeSerializers',
          'FunctionImportParameter'
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
