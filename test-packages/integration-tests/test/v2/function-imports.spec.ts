import { operations } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { errorResponse } from '../test-data/error-response';
import { singleTestEntityResponse } from '../test-data/single-test-entity-response';
import type { HttpDestination } from '@sap-cloud-sdk/connectivity';

const basePath = '/sap/opu/odata/sap/API_TEST_SRV';
const basicHeaderCSRF = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
const csrfToken = 'CSRFTOKEN';

function mockCsrfTokenRequest(url: string) {
  nock(url, {
    reqheaders: {
      authorization: basicHeaderCSRF,
      'x-csrf-token': 'Fetch'
    }
  })
    .head(`${basePath}/`)
    .reply(200, '', {
      'x-csrf-token': csrfToken,
      'Set-Cookie': ['key1=val1', 'key2=val2', 'key3=val3']
    });
}

const destination: HttpDestination = {
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
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${basePath}/TestFunctionImportEdmReturnType`)
      .reply(200, singleTestEntityResponse());

    const request = operations
      .testFunctionImportEdmReturnType({})
      .execute(destination);
    await expect(request).resolves.not.toThrow();
  });

  it('should reject on error response, using `functionImports` import', async () => {
    mockCsrfTokenRequest(destination.url);

    nock(destination.url, {
      reqheaders: {
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${basePath}/TestFunctionImportEdmReturnType`)
      .reply(400, errorResponse());

    const request = operations
      .testFunctionImportEdmReturnType({})
      .execute(destination);
    await expect(request).rejects.toThrowErrorMatchingSnapshot();
  });
});
