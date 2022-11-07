import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import { Destination } from '@sap-cloud-sdk/connectivity';
import nock from 'nock';

describe('bound function import request builder', () => {
  const { testEntityApi } = testService();
  const servicePath = TestEntity._defaultServicePath;
  const host = 'https://example.com';

  const destination: Destination = {
    url: host,
    username: 'username',
    password: 'password',
    sapClient: '123',
    authTokens: [],
    originalProperties: {}
  };

  it('executes a bound action', async () => {
    nock(host)
      .get(
        `${servicePath}/TestEntity(KeyTestEntity=123)/boundFunctionWithoutArguments()`
      )
      .reply(200, { value: 'returnValue' });

    const entity = testEntityApi
      .entityBuilder()
      .fromJson({ keyTestEntity: 123 });
    const response = await entity
      .boundFunctionWithoutArguments({})
      .execute(destination);
    expect(response).toEqual('returnValue');
  });
});
