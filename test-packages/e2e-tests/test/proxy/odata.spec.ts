import {
  Destination,
  ProxyConfiguration,
  Protocol
} from '@sap-cloud-sdk/connectivity';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { AxiosError } from 'axios';
import { basicHeader } from '@sap-cloud-sdk/connectivity/internal';
import { destination as e2eDestination } from '../test-util';
import { testEntityApi } from '../test-utils/test-entity-operations';
/* eslint-disable  @typescript-eslint/no-var-requires */
const {
  proxyBearAuth,
  proxyHost,
  proxyPort,
  proxyUser,
  proxyPassword
} = require('./proxy-server-config');

const onPremDestination: Destination = {
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
      'Proxy-Authorization': proxyBearAuth
    }
  }
};
const internetDestination: Destination = {
  url: e2eDestination?.url,
  proxyType: 'Internet',
  authentication: 'NoAuthentication',
  proxyConfiguration: {
    host: proxyHost,
    port: proxyPort,
    protocol: Protocol.HTTP,
    headers: {
      'Proxy-Authorization': basicHeader(proxyUser, proxyPassword)
    }
  }
};

describe('OData OnPrem', () => {
  it('should go through proxy if proxy authorization header matches', async () => {
    const requestBuilder = testEntityApi.requestBuilder();
    const testEntity = await requestBuilder
      .getByKey(101)
      .execute(onPremDestination);
    expect(testEntity).toEqual(expect.objectContaining({ keyTestEntity: 101 }));
  }, 60000);

  it('should fail with 403 if proxy authorization header does not match', async () => {
    const proxyConfiguration: ProxyConfiguration = {
      ...onPremDestination.proxyConfiguration!,
      headers: { 'Proxy-Authorization': 'wrongValue' }
    };
    const destinationWithWrongProxyAuth = {
      ...onPremDestination,
      proxyConfiguration
    };

    const requestBuilder = testEntityApi.requestBuilder();
    requestBuilder
      .getByKey(101)
      .execute(destinationWithWrongProxyAuth)
      .catch((error: ErrorWithCause) => {
        const actual = (error.rootCause as AxiosError).response!.status;
        expect(actual).toEqual(403);
      });
  }, 60000);
});

describe('OData Cloud', () => {
  it('should go through proxy if proxy authorization header matches', async () => {
    const requestBuilder = testEntityApi.requestBuilder();
    const testEntity = await requestBuilder
      .getByKey(101)
      .execute(internetDestination);
    expect(testEntity).toEqual(expect.objectContaining({ keyTestEntity: 101 }));
  }, 60000);
});
