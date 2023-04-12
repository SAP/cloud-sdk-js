import { HttpDestination } from '@sap-cloud-sdk/connectivity';
import {
  DestinationWithName,
  RegisterDestinationOptions,
  registerDestination
} from '@sap-cloud-sdk/connectivity/src/scp-cf';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import mock from 'mock-fs';
import nock from 'nock';
import { mockServiceBindings } from '../../../test-resources/test/test-util/environment-mocks';

describe('mTLS on CloudFoundry', () => {
  beforeAll(() => {
    mock({
      'cf-crypto': {
        'cf-cert': 'my-cert',
        'cf-key': 'my-key'
      }
    });

    process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
    process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';
  });

  afterAll(() => {
    mock.restore();

    delete process.env.CF_INSTANCE_CERT;
    delete process.env.CF_INSTANCE_KEY;
  });

  const testDestinationWithMtls: DestinationWithName & HttpDestination = {
    name: 'RegisteredDestination',
    url: 'https://example.com/mtls',
    isTrustingAllCertificates: true
  };

  const options: RegisterDestinationOptions = {
    inferMtls: true
  };

  // fixme: actually needs to assert on cert/key being part of the request
  it('can perform http request with mTLS on registered destination', async () => {
    nock('https://example.com').get('/mtls').reply(200);
    mockServiceBindings();

    await registerDestination(testDestinationWithMtls, options);
    const response = await executeHttpRequest(testDestinationWithMtls);

    expect(response.status).toEqual(200);
  });
});
