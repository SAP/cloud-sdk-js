import { createLogger } from '@sap-cloud-sdk/util';
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

  it('logs warning for inline schema', async () => {
    const logger = createLogger('openapi-generator');
    spyOn(logger, 'warn');

    expect(
      parseRequestBody(
        {
          content: {
            'application/json': {
              schema: {}
            }
          }
        },
        await createRefs()
      )
    ).toBeUndefined();

    expect(logger.warn).toHaveBeenCalledWith(
      'The SAP Cloud SDK OpenApi generator currently does not support inline schemas. This will likely cause issues when using this client.'
    );
  });
});
