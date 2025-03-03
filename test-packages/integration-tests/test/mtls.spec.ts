import { registerDestination } from '@sap-cloud-sdk/connectivity/src/scp-cf';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import axios from 'axios';
import mock from 'mock-fs';
import nock from 'nock';
import { mockServiceBindings } from '../../../test-resources/test/test-util/environment-mocks';
import type {
  DestinationWithName,
  RegisterDestinationOptions
} from '@sap-cloud-sdk/connectivity/src/scp-cf';
import type { HttpDestination } from '@sap-cloud-sdk/connectivity';

describe('mTLS on CloudFoundry', () => {
  beforeEach(() => {
    mock({
      'cf-crypto': {
        'cf-cert': 'my-cert',
        'cf-key': 'my-key'
      }
    });

    process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
    process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';
  });

  afterEach(() => {
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

  it('can perform an http request against a registered destination using mTLS', async () => {
    nock('https://example.com').get('/mtls').reply(200);
    mockServiceBindings();
    const spy = jest.spyOn(axios, 'request');

    await registerDestination(testDestinationWithMtls, options);
    const response = await executeHttpRequest(testDestinationWithMtls);

    expect(response.status).toEqual(200);
    expect(spy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        httpsAgent: expect.objectContaining({
          options: expect.objectContaining({
            cert: 'my-cert',
            key: 'my-key'
          })
        })
      })
    );
  });
});
