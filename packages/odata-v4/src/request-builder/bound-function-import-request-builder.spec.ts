import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
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

  it('executes a bound function without arguments', async () => {
    nock(host)
      .get(
        `${servicePath}/A_TestEntity(KeyPropertyGuid=12345678-aaaa-bbbb-cccc-ddddeeeeffff,KeyPropertyString=%27abc%27)/boundFunctionWithoutArguments()`
      )
      .reply(200, { value: 'returnValue' });

    const entity = testEntityApi.entityBuilder().fromJson({
      keyPropertyGuid: '12345678-aaaa-bbbb-cccc-ddddeeeeffff',
      keyPropertyString: 'abc'
    });
    const response = await entity
      .boundFunctionWithoutArguments({})
      .execute(destination);
    expect(response).toEqual('returnValue');
  });

  it('executes a bound function with arguments', async () => {
    nock(host)
      .get(
        `${servicePath}/A_TestEntity(KeyPropertyGuid=12345678-aaaa-bbbb-cccc-ddddeeeeffff,KeyPropertyString=%27abc%27)/boundFunctionWithArguments(param1=%27foo%27,param2=%27bar%27)`
      )
      .reply(200, { value: 'returnValue' });

    const entity = testEntityApi.entityBuilder().fromJson({
      keyPropertyGuid: '12345678-aaaa-bbbb-cccc-ddddeeeeffff',
      keyPropertyString: 'abc'
    });
    const response = await entity
      .boundFunctionWithArguments({ param1: 'foo', param2: 'bar' })
      .execute(destination);
    expect(response).toEqual('returnValue');
  });
});
