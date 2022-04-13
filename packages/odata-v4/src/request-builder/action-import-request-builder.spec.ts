import nock from 'nock';
import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportUnsupportedEdmTypes
} from '@sap-cloud-sdk/test-services/v4/test-service/action-imports';
import { TestComplexType } from '@sap-cloud-sdk/test-services/v4/test-service';
import { entitySerializer } from '@sap-cloud-sdk/odata-common/internal';
import { defaultDeSerializers } from '../de-serializers';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const host = 'https://example.com';

const destination: Destination = {
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
    .head(path ? `${servicePath}/${path}` : servicePath)
    .reply(200, '', mockedBuildHeaderResponse);
}

describe('action import request builder', () => {
  it('should call simple action', async () => {
    mockCsrfTokenRequest('TestActionImportNoParameterNoReturnType');

    nock(host, {
      reqheaders: {
        'x-csrf-token': mockedBuildHeaderResponse['x-csrf-token']
      }
    })
      .post(`${servicePath}/TestActionImportNoParameterNoReturnType`)
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
      .post(`${servicePath}/TestActionImportUnsupportedEdmTypes`, {
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
        `${servicePath}/TestActionImportMultipleParameterComplexReturnType`,
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
        .post(`${servicePath}/TestActionImportNoParameterNoReturnType`)
        .reply(204, {});

      const actual = await testActionImportNoParameterNoReturnType(
        {}
      ).executeRaw(destination);
      expect(actual.data).toEqual({});
      expect(actual.request.method).toBe('POST');
    });
  });
});
