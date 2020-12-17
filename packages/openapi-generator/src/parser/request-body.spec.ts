import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { createRefs } from '../../test/test-util';
import { parseRequestBody } from './request-body';

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

  it('returns object type from in line schema', async () => {
    const requestBody: OpenAPIV3.RequestBodyObject = {
      content: {
        'application/json': {
          schema: {
            type: 'object'
          }
        }
      }
    };

    expect(parseRequestBody(requestBody, await createRefs())).toEqual({
      ...requestBody,
      parameterName: 'object',
      parameterType: 'object'
    });
  });

  it('returns string array type from in line schema', async () => {
    const requestBody: OpenAPIV3.RequestBodyObject = {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    };

    expect(parseRequestBody(requestBody, await createRefs())).toEqual({
      ...requestBody,
      parameterName: 'arrayString',
      parameterType: 'Array<string>'
    });
  });
});
