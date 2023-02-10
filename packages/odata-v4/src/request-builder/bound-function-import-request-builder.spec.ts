import { HttpDestination } from '@sap-cloud-sdk/connectivity';
import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import nock from 'nock';

describe('bound function import request builder', () => {
  const { testEntityApi } = testService();
  const basePath = TestEntity._defaultBasePath;
  const host = 'https://example.com';

  const destination: HttpDestination = {
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
        `${basePath}/A_TestEntity(KeyPropertyGuid=12345678-aaaa-bbbb-cccc-ddddeeeeffff,KeyPropertyString='abc')/boundFunctionWithoutArguments()`
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
        `${basePath}/A_TestEntity(KeyPropertyGuid=12345678-aaaa-bbbb-cccc-ddddeeeeffff,KeyPropertyString='abc')/boundFunctionWithArguments(param1='foo',param2='bar')`
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
