import nock from 'nock';
import { Destination } from '../../../src/connectivity';
import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportUnsupportedEdmTypes
} from '../../../test/test-util/test-services/v4/test-service/action-imports';
import { TestComplexType } from '../../../test/test-util/test-services/v4/test-service';
import { serializeComplexType } from '../entity-serializer';

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

describe('action import request builder', () => {
  it('should call simple action.', async () => {
    nock(host)
      .get(
        `${servicePath}/TestActionImportNoParameterNoReturnType?$format=json`
      )
      .reply(204);

    nock(host)
      .post(
        `${servicePath}/TestActionImportNoParameterNoReturnType?$format=json`
      )
      .reply(204);

    const result = await testActionImportNoParameterNoReturnType({}).execute(
      destination
    );
    expect(result).toBe(undefined);
  });

  it('is possible to call actions with unknown edm types', async () => {
    nock(host)
      .get(`${servicePath}/TestActionImportUnsupportedEdmTypes?$format=json`)
      .reply(204);
    const responseValue = 'SomeUntypedResponse';
    const response = { value: responseValue };

    nock(host)
      .post(`${servicePath}/TestActionImportUnsupportedEdmTypes?$format=json`, {
        SimpleParam: 'someUntypedParameter'
      })
      .reply(200, response);

    const result = await testActionImportUnsupportedEdmTypes({
      simpleParam: 'someUntypedParameter'
    }).execute(destination);
    expect(result).toEqual(responseValue);
  });

  it('should call an action and parse the response', async () => {
    nock(host)
      .get(
        `${servicePath}/TestActionImportMultipleParameterComplexReturnType?$format=json`
      )
      .reply(204);

    const tsBody = { stringParam: 'LaLa', nonNullableStringParam: 'LuLu' };
    const tsResponse = { stringProperty: 'someResponseValue' };

    const httpResponse = serializeComplexType(tsResponse, TestComplexType);
    const httpBody = { StringParam: 'LaLa', NonNullableStringParam: 'LuLu' };

    nock(host)
      .post(
        `${servicePath}/TestActionImportMultipleParameterComplexReturnType?$format=json`,
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
      nock(host)
        .get(
          `${servicePath}/TestActionImportNoParameterNoReturnType?$format=json`
        )
        .reply(204);

      nock(host)
        .post(
          `${servicePath}/TestActionImportNoParameterNoReturnType?$format=json`
        )
        .reply(204, {});

      const actual = await testActionImportNoParameterNoReturnType(
        {}
      ).executeRaw(destination);
      expect(actual.data).toEqual({});
      expect(actual.request.method).toBe('POST');
    });
  });
});
