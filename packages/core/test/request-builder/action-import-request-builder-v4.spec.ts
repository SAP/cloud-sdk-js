/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { defaultDestination } from '../test-util/request-mocker';
import { mockCsrfTokenRequest } from '../../../../test-packages/integration-tests/test/test-util/request-mocker';
import { Destination } from '../../src/scp-cf';
import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType
} from '../test-util/test-services/v4/test-service/action-imports';
import { TestComplexType } from '../test-util/test-services/v4/test-service';
import { serializeEntity } from '../../src/odata/v4';

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

    nock(host).post(`${servicePath}/TestActionImportNoParameterNoReturnType?$format=json`).reply(204);

    const result = await testActionImportNoParameterNoReturnType({}).execute(
      destination
    );
    expect(result).toBe(undefined);
  });

  it('should call an action with .', async () => {
    mockCsrfTokenRequest(host, defaultDestination.sapClient!, servicePath);

    const response = {StringProperty:'SomeValue'}
    nock(host).post(`${servicePath}/TestActionImportMultipleParameterComplexReturnType?$format=json`).reply(200,response);

    const result = await testActionImportMultipleParameterComplexReturnType({stringParam:'Lala',nonNullableStringParam:'LiLu'}).execute(
      destination
    );
    expect(result).toBe(undefined);
  });
});
