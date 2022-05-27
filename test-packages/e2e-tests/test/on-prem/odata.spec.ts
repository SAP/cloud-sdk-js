import { Destination, ProxyConfiguration, Protocol } from '@sap-cloud-sdk/connectivity';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { AxiosError } from 'axios';
import { destination as e2eDestination } from '../test-util';
import { testEntityApi } from '../test-utils/test-entity-operations';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { proxyAuth, proxyHost, proxyPort } = require('./proxy-server-config');

const destination: Destination = {
  url: e2eDestination?.url,
  proxyType: 'OnPremise',
  // NoAuthentication is not possible with OnPremise proxy type.
  authentication: 'BasicAuthentication',
  username: '',
  password: '',
  proxyConfiguration: {
    host: proxyHost,
    port: proxyPort,
    protocol: Protocol.HTTP,
    headers: {
      'Proxy-Authorization': proxyAuth
    }
  }
};

describe('OData OnPrem', () => {
  it('should go through proxy if proxy authorization header matches', async () => {
    const requestBuilder = testEntityApi.requestBuilder();
    const testEntity = await requestBuilder.getByKey(101).execute(destination);
    expect(testEntity).toEqual(expect.objectContaining({ keyTestEntity: 101 }));
  }, 60000);

  it('should fail with 403 if proxy authorization header does not match', async () => {
    const proxyConfiguration: ProxyConfiguration = { ...destination.proxyConfiguration!, headers: { 'Proxy-Authorization': 'wrongValue' } };
    const destinationWithWrongProxyAuth = { ...destination, proxyConfiguration };

    const requestBuilder = testEntityApi.requestBuilder();
    requestBuilder.getByKey(101).execute(destinationWithWrongProxyAuth)
      .catch((error: ErrorWithCause)=> {
        const actual = (error.rootCause as AxiosError).response!.status;
        expect(actual).toEqual(403);
      });
  }, 60000);
});
