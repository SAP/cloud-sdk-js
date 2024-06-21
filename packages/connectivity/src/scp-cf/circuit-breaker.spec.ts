import nock from 'nock';
import * as jwt123 from 'jsonwebtoken';
import { circuitBreakers } from '@sap-cloud-sdk/resilience/internal';
import {
  destinationServiceUri,
  providerXsuaaUrl,
  xsuaaBindingMock
} from '../../../../test-resources/test/test-util/environment-mocks';
import { privateKey } from '../../../../test-resources/test/test-util/keys';
import { getClientCredentialsToken } from './xsuaa-service';
import { fetchDestinationWithTokenRetrieval } from './destination';

const jwt = jwt123.sign(
  JSON.stringify({ user_id: 'user', zid: 'tenant' }),
  privateKey,
  {
    algorithm: 'RS512'
  }
);

describe('circuit breaker', () => {
  beforeEach(() => {
    Object.values(circuitBreakers).forEach(cb => cb.close());
    nock.cleanAll();
  });

  afterEach(() => {
    Object.values(circuitBreakers).forEach(cb => cb.close());
    nock.cleanAll();
  });

  it('opens after 50% failed request attempts (with at least 10 recorded requests) for destination service', async () => {
    const request = () =>
      fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
        destinationName: 'FINAL-DESTINATION'
      });

    nock(destinationServiceUri)
      .get(/.*/)
      .times(1)
      .reply(200, JSON.stringify({ URL: 'test' }));

    // First attempt should succeed inits the breaker
    await expect(request()).resolves.toBeDefined();

    // All following requests will fail to open the breaker
    nock(destinationServiceUri).persist().get(/.*/).reply(500);

    let keepCalling = true;
    let failedCalls = 0;
    // hit until breaker opens
    while (keepCalling) {
      try {
        await request();
        await sleep(50);
      } catch (e) {
        if (e.cause.message === 'Request failed with status code 500') {
          failedCalls++;
        }
        if (e.cause.message === 'Breaker is open') {
          keepCalling = false;
        }
      }
    }
    // Since we exit the loop breaker opened.
    expect(failedCalls).toBeGreaterThan(0);
  });

  it('opens after 50% failed request attempts (with at least 10 recorded requests) for xsuaa service', async () => {
    const request = () => getClientCredentialsToken(xsuaaBindingMock);

    nock(providerXsuaaUrl)
      .post('/oauth/token')
      .times(1)
      .reply(200, { access_token: 'token' });

    // First attempt should succeed
    await expect(request()).resolves.toBeDefined();

    // All following requests will fail to open the breaker
    nock(providerXsuaaUrl).persist().post('/oauth/token').reply(500);

    let keepCalling = true;
    let failedCalls = 0;
    // hit until breaker opens
    while (keepCalling) {
      try {
        await request();
        await sleep(50);
      } catch (e) {
        if (e.message.match(/500/)) {
          failedCalls++;
        }
        if (e.message.match(/Breaker is open/)) {
          keepCalling = false;
        }
      }
    }
    // Since we exit the loop breaker opened.
    expect(failedCalls).toBeGreaterThan(0);
  }, 15000);
});

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
