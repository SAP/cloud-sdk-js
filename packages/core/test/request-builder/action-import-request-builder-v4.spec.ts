/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { defaultDestination } from '../test-util/request-mocker';
import { ActionImportRequestBuilder } from '../../src/odata/v4/request-builder/action-import-request-builder';
import { transformReturnValueForUndefined } from '../../src/odata/v2/request-builder';
import { mockCsrfTokenRequest } from '../../../../test-packages/integration-tests/test/test-util/request-mocker';
import { Destination } from '../../src/scp-cf';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const host = 'https://example.com';
const actionName = 'myActionReturnVoid';
// TODO in the next PR the actions will be generated from the edmx and called from the generated code
const myActionReturnVoid = new ActionImportRequestBuilder(
  servicePath,
  actionName,
  data => transformReturnValueForUndefined(data, val => undefined),
  {}
);

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

    nock(host).post(`${servicePath}/${actionName}`).reply(204);

    const result = await myActionReturnVoid.execute(destination);
    expect(result).toBe(undefined);
  });
});
