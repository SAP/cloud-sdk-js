import { OpenAPIV3 } from 'openapi-types';
import { emptyApiDefinition } from '../../test/test-util';
import { OpenApiOperation } from '../openapi-types';
import { ensureUniqueOperationIds } from './operation-naming';

describe('ensureUniqueOperationIds', () => {
  it('replaces duplicate names, while prioritizing original names', () => {
    const uniqueOperations = ensureUniqueOperationIds([
      { operationId: 'getX' },
      { operationId: 'getX' },
      { operationId: 'getX1' }
    ] as OpenApiOperation[]);

    expect(uniqueOperations.map(({ operationId }) => operationId)).toEqual([
      'getX',
      'getX2',
      'getX1'
    ]);
  });

  it('adds names when there is no operationId, while prioritizing original names', () => {
    const uniqueOperations = ensureUniqueOperationIds(([
      { method: 'get' },
      { method: 'post' },
      { operationId: 'getX' },
      { operationId: 'createX' }
    ] as unknown) as OpenApiOperation[]);
    expect(uniqueOperations.map(({ operationId }) => operationId)).toEqual([
      'getX1',
      'createX1',
      'getX',
      'createX'
    ]);
  });

  it('prioritizes extensions', () => {
    const uniqueOperations = ensureUniqueOperationIds(([
      { method: 'get' },
      { method: 'post' },
      { operationId: 'getX' },
      { operationId: 'createX' }
    ] as unknown) as OpenApiOperation[]);

    const newSpec = ensureUniqueOperationIds({
      ...emptyApiDefinition,
      paths: {
        '/url': {
          get: {
            'x-sap-cloud-sdk-operation-name': 'niceGetName',
            operationId: 'id'
          },
          post: {
            'x-sap-cloud-sdk-operation-name': 'nicePostName'
          }
        }
      }
    } as OpenAPIV3.Document);

    expect(newSpec.paths).toEqual({
      '/url': {
        get: {
          operationId: 'niceGetName',
          'x-sap-cloud-sdk-operation-name': 'niceGetName'
        },
        post: {
          operationId: 'nicePostName',
          'x-sap-cloud-sdk-operation-name': 'nicePostName'
        }
      }
    });
  });
});

describe('getOperationNameFromPatternAndMethod', () => {
  it('parses the operation name from the pattern and method', () => {
    expect(getOperationNameFromPatternAndMethod('/entity', 'get')).toEqual(
      'getEntity'
    );
  });

  it('parses the operation name from the pattern and method for post', () => {
    expect(
      getOperationNameFromPatternAndMethod('/entity/property', 'post')
    ).toEqual('createEntityProperty');
  });

  it('parses the operation name from the pattern and method with one placeholder', () => {
    expect(
      getOperationNameFromPatternAndMethod('/entity/{entityId}/property', 'get')
    ).toEqual('getEntityPropertyByEntityId');
  });

  it('parses the operation name from the pattern and method with multiple placeholders', () => {
    expect(
      getOperationNameFromPatternAndMethod(
        '/entity/{entityId}/property/{propertyId}',
        'get'
      )
    ).toEqual('getEntityPropertyByEntityIdAndPropertyId');
  });

  it('parses the operation name from the pattern and method with only placeholders', () => {
    expect(
      getOperationNameFromPatternAndMethod('/{placeholder}', 'get')
    ).toEqual('getByPlaceholder');
  });
});
