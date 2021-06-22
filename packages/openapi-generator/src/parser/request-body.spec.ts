import { createLogger } from '@sap-cloud-sdk/util';
import { createTestRefs } from '../../test/test-util';
import { parseRequestBody } from './request-body';

const defaultOptions = { strictNaming: true };
describe('getRequestBody', () => {
  it('returns undefined for undefined', async () => {
    const logger = createLogger('openapi-generator');
    spyOn(logger, 'warn');
    expect(
      parseRequestBody(undefined, await createTestRefs(), defaultOptions)
    ).toBeUndefined();
    expect(logger.warn).not.toHaveBeenCalled();
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
        defaultOptions
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
      parseRequestBody(
        requestBody,
        await createTestRefs({ schemas: { TestEntity: { type: 'string' } } }),
        defaultOptions
      )
    ).toEqual({
      schema: { ...schema, ...schemaNaming },
      required: true
    });
  });
});
