import { functionImports } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { errorResponse } from '../test-data/error-response';
import { singleTestEntityResponse } from '../test-data/single-test-entity-response';

const servicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const basicHeaderCSRF = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
const csrfToken = 'CSRFTOKEN';

function mockCsrfTokenRequest(url: string) {
  nock(url, {
    reqheaders: {
      authorization: basicHeaderCSRF,
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
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/TestFunctionImportEdmReturnType`)
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
        authorization: basicHeader(
          destination.username!,
          destination.password!
        ),
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .get(`${servicePath}/TestFunctionImportEdmReturnType`)
      .reply(400, errorResponse());

    const request = functionImports
      .testFunctionImportEdmReturnType({})
      .execute(destination);
    await expect(request).rejects.toThrowErrorMatchingSnapshot();
  });
});
