import { createLogger } from '@sap-cloud-sdk/util';
import { createTestRefs } from '../../test/test-util';
import { parseRequestBody } from './request-body';

describe('getRequestBody', () => {
  it('returns undefined for undefined', async () => {
    const logger = createLogger('openapi-generator');
    spyOn(logger, 'debug');
    expect(parseRequestBody(undefined, await createTestRefs(), {})).toBeUndefined();
    expect(logger.debug).not.toHaveBeenCalled();
  });

  it('resolves referenced request body schema', async () => {
    const requestBody = {
      $ref: '#/components/requestBodies/RequestBody'
    };

    expect(
      parseRequestBody(
        requestBody,
        await createTestRefs({
          requestBodies: {
            RequestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }),
        {}
      )
    ).toEqual({
      schema: { type: 'string' },
      required: false
    });
  });

  it('resolves referenced schema', async () => {
    const schema = {
      $ref: '#/components/schemas/TestEntity'
    };
    const requestBody = {
      content: {
        'application/json': { schema }
      },
      required: true
    };

    const schemaNaming = {
      schemaName: 'TestEntity',
      fileName: 'test-entity'
    };

    expect(
      parseRequestBody(requestBody, await createTestRefs(), {
        '#/components/schemas/TestEntity': schemaNaming
      })
    ).toEqual({
      schema: { ...schema, ...schemaNaming },
      required: true
    });
  });
});
