import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { createRefs } from '../../test/test-util';
import { parseRequestBody, parseSchemaMetadata } from './request-body';

describe('getRequestBody', () => {
  it('returns undefined for undefined', async () => {
    const logger = createLogger('openapi-generator');
    spyOn(logger, 'warn');
    expect(parseRequestBody(undefined, await createRefs())).toBeUndefined();
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('returns type from referenced schema', async () => {
    const requestBody = {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/TestEntity'
          }
        }
      }
    };

    expect(parseRequestBody(requestBody, await createRefs())).toEqual({
      ...requestBody,
      parameterName: 'testEntity',
      parameterType: 'TestEntity'
    });
  });

  it('returns type from referenced schema in reference object', async () => {
    const requestBody = {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/TestEntity'
          }
        }
      }
    };

    expect(
      parseRequestBody(
        {
          $ref: '#/components/requestBodies/Body'
        },
        await createRefs({
          requestBodies: {
            Body: requestBody
          }
        })
      )
    ).toEqual({
      ...requestBody,
      parameterName: 'testEntity',
      parameterType: 'TestEntity'
    });
  });

  it('returns Record<string, any> type from in line schema', async () => {
    const schema: OpenAPIV3.NonArraySchemaObject = { type: 'object' };

    expect(parseSchemaMetadata(schema)).toEqual({
      isArrayType: false,
      isReferenceType: false,
      nonArrayType: 'Record<string, any>'
    });
  });

  it('returns string array type from inline schema', async () => {
    const schema: OpenAPIV3.ArraySchemaObject = {
      type: 'array',
      items: {
        type: 'string'
      }
    };

    expect(parseSchemaMetadata(schema)).toEqual({
      isArrayType: true,
      isReferenceType: false,
      arrayInnerType: {
        isArrayType: false,
        isReferenceType: false,
        nonArrayType: 'string'
      }
    });
  });

  it('returns nested array type from inline schema', async () => {
    const schema: OpenAPIV3.ArraySchemaObject = {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    };

    expect(parseSchemaMetadata(schema)).toEqual({
      isArrayType: true,
      isReferenceType: false,
      arrayInnerType: {
        isArrayType: true,
        isReferenceType: false,
        arrayInnerType: {
          isArrayType: false,
          isReferenceType: false,
          nonArrayType: 'string'
        }
      }
    });
  });
});
