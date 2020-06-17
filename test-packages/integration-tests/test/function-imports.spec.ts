/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Destination } from '@sap-cloud-sdk/core';
import { functionImports } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { errorResponse } from './test-data/error-response';
import { singleTestEntityResponse } from './test-data/single-test-entity-response';
import { basicCredentials } from './test-util/destination-encoder';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const basicHeader = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
const csrfToken = 'CSRFTOKEN';

function mockCsrfTokenRequest(url: string) {
  nock(url, {
    reqheaders: {
      authorization: basicHeader,
      'x-csrf-token': 'Fetch'
    }
  })
    .get(servicePath)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}

const destination: Destination = {
  url: 'https://example.com',
  username: 'username',
  password: 'password',
  sapClient: '123',
  authTokens: [],
  originalProperties: {}
};

describe('Function imports', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should resolve on successful response, using `functionImports` import', async () => {
    mockCsrfTokenRequest(destination.url);

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/TestFunctionImportEdmReturnType?$format=json`)
      .reply(200, singleTestEntityResponse());

    const request = functionImports
      .testFunctionImportEdmReturnType({})
      .execute(destination);
    await expect(request).resolves.not.toThrow();
  });

  it('should reject on error response, using `functionImports` import', async () => {
    mockCsrfTokenRequest(destination.url);

    nock(destination.url, {
      reqheaders: {
        authorization: basicCredentials(destination),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/TestFunctionImportEdmReturnType?$format=json`)
      .reply(400, errorResponse());

    const request = functionImports
      .testFunctionImportEdmReturnType({})
      .execute(destination);
    await expect(request).rejects.toThrowErrorMatchingSnapshot();
  });
});
