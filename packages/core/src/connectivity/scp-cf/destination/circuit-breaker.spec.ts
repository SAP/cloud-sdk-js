import nock from 'nock';
import * as jwt123 from 'jsonwebtoken';
import {
  destinationServiceUri,
  providerXsuaaClientCredentials,
  providerXsuaaUrl
} from '../../../../test/test-util/environment-mocks';
import { privateKey } from '../../../../test/test-util/keys';
import { circuitBreakerDefaultOptions } from '../resilience-options';
import { clientCredentialsGrant } from '../xsuaa-service';
import { fetchDestination } from './destination-service';

const jwt = jwt123.sign(
  JSON.stringify({ user_id: 'user', zid: 'tenant' }),
  privateKey(),
  {
    algorithm: 'RS512'
  }
);

const attempts = circuitBreakerDefaultOptions.volumeThreshold!;

describe('circuit breaker', () => {
  it('opens after 50% failed request attempts (with at least 10 recorded requests) for destination service', async () => {
    const request = () =>
      fetchDestination(destinationServiceUri, jwt, 'FINAL-DESTINATION');

    nock(destinationServiceUri)
      .get(/.*/)
      .times(1)
      .reply(200, JSON.stringify({ URL: 'test' }));
    nock(destinationServiceUri).get(/.*/).times(attempts).reply(400);

    // First attempt should succeed
    expect(await request()).toBeDefined();

    // Following attempts should fail
    for (let i = 0; i < attempts - 1; i++) {
      await expectToThrowWithRootCause(
        request,
        'Request failed with status code 400'
      );
    }

    // Last attempt should open the circuit breaker
    await expectToThrowWithRootCause(request, 'Breaker is open');
  });

  it('opens after 50% failed request attempts (with at least 10 recorded requests) for xsuaa service', async () => {
    const request = () =>
      clientCredentialsGrant(providerXsuaaClientCredentials, {
        username: 'user',
        password: 'pass'
      });

    nock(providerXsuaaUrl).post('/oauth/token').times(1).reply(200);

    nock(providerXsuaaUrl).post('/oauth/token').times(attempts).reply(400);

    // First attempt should succeed
    expect(await request()).toBeDefined();

    // Following attempts should fail
    for (let i = 0; i < attempts - 1; i++) {
      await expectToThrowWithRootCause(
        request,
        'Request failed with status code 400'
      );
    }

    // Last attempt should open the circuit breaker
    await expectToThrowWithRootCause(request, 'Breaker is open');
  });
});

async function expectToThrowWithRootCause(
  fn: () => any,
  rootCause: string
): Promise<void> {
  try {
    await fn();
    fail('Expected to throw.');
  } catch (err) {
    expect(err.rootCause.message).toEqual(rootCause);
  }
}
