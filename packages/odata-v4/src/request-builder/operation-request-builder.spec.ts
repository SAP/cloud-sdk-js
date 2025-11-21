import nock from 'nock';
import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportUnsupportedEdmTypes
} from '@sap-cloud-sdk/test-services-odata-v4/test-service/operations';
import {
  TestComplexType,
  testFunctionImportMultipleParams
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { entitySerializer } from '@sap-cloud-sdk/odata-common';
import { defaultDestination } from '../../../../test-resources/test/test-util/request-mocker';
import { defaultDeSerializers } from '../de-serializers';
import type { HttpDestination } from '@sap-cloud-sdk/connectivity';

const basePath = '/sap/opu/odata/sap/API_TEST_SRV';
const host = 'https://example.com';

const destination: HttpDestination = {
  url: host,
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

const mockedBuildHeaderResponse = {
  'x-csrf-token': 'mocked-x-csrf-token',
  'set-cookie': ['mocked-cookie-0', 'mocked-cookie-1']
};

function mockCsrfTokenRequest(path?: string) {
  nock(host, {
    reqheaders: {
      'x-csrf-token': 'Fetch'
    }
  })
    .head(path ? `${basePath}/${path}` : basePath)
    .reply(200, '', mockedBuildHeaderResponse);
}

describe('operation request builder', () => {
  it('should call simple action', async () => {
    mockCsrfTokenRequest('TestActionImportNoParameterNoReturnType');

    nock(host, {
      reqheaders: {
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token']
      }
    })
      .post(`${basePath}/TestActionImportNoParameterNoReturnType`)
      .reply(204);

    const result = await testActionImportNoParameterNoReturnType({}).execute(
      destination
    );
    expect(result).toBe(undefined);
  });

  it('is possible to call actions with unknown EDM types', async () => {
    const responseValue = 'SomeUntypedResponse';
    const response = { value: responseValue };

    mockCsrfTokenRequest('TestActionImportUnsupportedEdmTypes');

    nock(host)
      .post(`${basePath}/TestActionImportUnsupportedEdmTypes`, {
        SimpleParam: 'someUntypedParameter'
      })
      .reply(200, response);

    const result = await testActionImportUnsupportedEdmTypes({
      simpleParam: 'someUntypedParameter'
    }).execute(destination);
    expect(result).toEqual(responseValue);
  });

  it('should call an action and parse the response', async () => {
    mockCsrfTokenRequest('TestActionImportMultipleParameterComplexReturnType');

    const tsBody = { stringParam: 'LaLa', nonNullableStringParam: 'LuLu' };
    const tsResponse = { stringProperty: 'someResponseValue' };

    const httpResponse = entitySerializer(
      defaultDeSerializers
    ).serializeComplexType(tsResponse, TestComplexType);
    const httpBody = { StringParam: 'LaLa', NonNullableStringParam: 'LuLu' };

    nock(host)
      .post(
        `${basePath}/TestActionImportMultipleParameterComplexReturnType`,
        httpBody
      )
      .reply(200, httpResponse);

    const result = await testActionImportMultipleParameterComplexReturnType(
      tsBody
    ).execute(destination);
    expect(result).toEqual(tsResponse);
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      mockCsrfTokenRequest('TestActionImportNoParameterNoReturnType');

      nock(host)
        .post(`${basePath}/TestActionImportNoParameterNoReturnType`)
        .reply(204);

      const actual = await testActionImportNoParameterNoReturnType(
        {}
      ).executeRaw(destination);
      expect(actual.status).toEqual(204);
      expect(actual.request.method).toBe('POST');
    });
  });

  it('builds correct url for multiple parameters', async () => {
    const params = { stringParam: 'str1', nonNullableStringParam: 'str2' };

    const requestBuilder = testFunctionImportMultipleParams(params);

    const url = await requestBuilder.url(defaultDestination);
    const expected = expect.stringMatching(
      /TestFunctionImportMultipleParams\(.*StringParam.*\)/
    );
    expect(url).toEqual(expected);
    expect(url).toContain(`StringParam='${params.stringParam}'`);
    expect(url).toContain(
      `NonNullableStringParam='${params.nonNullableStringParam}'`
    );
  });
});
