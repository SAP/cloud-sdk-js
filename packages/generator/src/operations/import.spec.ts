import { orderBreakfast } from '../../test/test-util/data-model';
import { VdmServiceMetadata } from '../vdm-types';
import { operationImportDeclarations } from './import';

describe('import declarations for operations', () => {
  it('returns empty list when there are no functions', () => {
    const service = {};

    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'function',
      []
    );

    expect(actual).toEqual([]);
  });

  it('returns import declarations with correct request builder for a bound function', () => {
    const service = {};
    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'function',
      [{ ...orderBreakfast, isBound: true }]
    );
    expect(actual[0].namedImports).toContain(
      'BoundFunctionImportRequestBuilder'
    );
  });

  it('includes FunctionImportParameter if import has parameters.', () => {
    const service = {};
    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'function',
      [{ ...orderBreakfast, isBound: true }]
    );
    expect(actual[0].namedImports).toContain('FunctionImportParameter');
  });

  it('does not include FunctionImportParameter if import has no parameters.', () => {
    const service = {};
    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'function',
      [{ ...orderBreakfast, isBound: true, parameters: [] }]
    );
    expect(actual[0].namedImports).not.toContain('FunctionImportParameter');
  });

  it('includes service import for unbound operations', () => {
    const service = { className: 'myServiceClass' };
    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'function',
      [{ ...orderBreakfast, isBound: false, parameters: [] }]
    );
    expect(actual[1].namedImports).toContain('myServiceClass');
  });

  it('does not include service import for bound operations', () => {
    const service = { className: 'myServiceClass' };
    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'function',
      [{ ...orderBreakfast, isBound: true, parameters: [] }]
    );
    expect(actual[1]).toBeUndefined();
  });

  it('returns correct import declarations for a function with an EDM return type', () => {
    const service = {};

    const actual = operationImportDeclarations(
      service as VdmServiceMetadata,
      'action',
      [orderBreakfast]
    );

    expect(actual).toEqual([
      {
        kind: 16,
        moduleSpecifier: '@sap-cloud-sdk/odata-v4',
        namedImports: [
          'edmToTs',
          'transformReturnValueForEdmType',
          'DeSerializers',
          'DefaultDeSerializers',
          'defaultDeSerializers',
          'ActionImportRequestBuilder'
        ]
      },
      {
        kind: 16,
        moduleSpecifier: './service',
        namedImports: ['']
      }
    ]);
  });

  it('returns correct import declarations for a function with an EDM return type', () => {
    const service = {};

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
