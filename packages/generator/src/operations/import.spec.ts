import { orderBreakfast } from '../../test/test-util/data-model';
import { operationDeclarations } from './import';
import type { VdmServiceMetadata } from '../vdm-types';

describe('import declarations for operations', () => {
  it('returns empty list when there are no functions', () => {
    const service = {};

    const actual = operationDeclarations(service as VdmServiceMetadata, []);

    expect(actual).toEqual([]);
  });

  it('returns import declarations with correct request builder for a bound function', () => {
    const service = {};
    const actual = operationDeclarations(service as VdmServiceMetadata, [
      { ...orderBreakfast, isBound: true }
    ]);
    expect(actual[0].namedImports).toContain('BoundOperationRequestBuilder');
  });

  it('includes OperationParameter if import has parameters.', () => {
    const service = {};
    const actual = operationDeclarations(service as VdmServiceMetadata, [
      { ...orderBreakfast, isBound: true }
    ]);
    expect(actual[0].namedImports).toContain('OperationParameter');
  });

  it('does not include OperationParameter if import has no parameters.', () => {
    const service = {};
    const actual = operationDeclarations(service as VdmServiceMetadata, [
      { ...orderBreakfast, isBound: true, parameters: [] }
    ]);
    expect(actual[0].namedImports).not.toContain('OperationParameter');
  });

  it('includes service import for unbound operations', () => {
    const service = { className: 'myServiceClass' };
    const actual = operationDeclarations(service as VdmServiceMetadata, [
      { ...orderBreakfast, isBound: false, parameters: [] }
    ]);
    expect(actual[1].namedImports).toContain('myServiceClass');
  });

  it('does not include service import for bound operations', () => {
    const service = { className: 'myServiceClass' };
    const actual = operationDeclarations(service as VdmServiceMetadata, [
      { ...orderBreakfast, isBound: true, parameters: [] }
    ]);
    expect(actual[1]).toBeUndefined();
  });

  it('returns correct import declarations for a function with an EDM return type', () => {
    const service = {};

    const actual = operationDeclarations(service as VdmServiceMetadata, [
      orderBreakfast
    ]);

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
          'OperationParameter',
          'OperationRequestBuilder'
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
