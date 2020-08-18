/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { defaultDestination } from '../test-util/request-mocker';
import { mockCsrfTokenRequest } from '../../../../test-packages/integration-tests/test/test-util/request-mocker';
import { Destination } from '../../src/scp-cf';
import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportUnsupportedEdmTypes
} from '../test-util/test-services/v4/test-service/action-imports';
import { TestComplexType } from '../test-util/test-services/v4/test-service';
import { serializeComplexTypeV4 } from '../../src/odata/v4';

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
    mockCsrfTokenRequest(host, defaultDestination.sapClient!, servicePath);

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
    mockCsrfTokenRequest(host, defaultDestination.sapClient!, servicePath);
    const response = { something: 'SomeuntypedResponse' };

    nock(host)
      .post(`${servicePath}/TestActionImportUnsupportedEdmTypes?$format=json`, {
        SimpleParam: 'someUntypedParameter'
      })
      .reply(200, response);

    const result = await testActionImportUnsupportedEdmTypes({
      simpleParam: 'someUntypedParameter'
    }).execute(destination);
    expect(result).toEqual(response);
  });

  it('should call an action and parse the reponse', async () => {
    mockCsrfTokenRequest(host, defaultDestination.sapClient!, servicePath);

    const tsBody = { stringParam: 'LaLa', nonNullableStringParam: 'LuLu' };
    const tsResponse = { stringProperty: 'someResponseValue' };

    const httpResponse = serializeComplexTypeV4(tsResponse, TestComplexType);
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
});
