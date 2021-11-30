import nock from 'nock';
import * as jwt123 from 'jsonwebtoken';
import {
  destinationServiceUri,
  providerXsuaaUrl,
  xsuaaBindingMock
} from '../../../../test-resources/test/test-util/environment-mocks';
import { privateKey } from '../../../../test-resources/test/test-util/keys';
import { circuitBreakerDefaultOptions } from './resilience-options';
import { getClientCredentialsToken } from './xsuaa-service';
import { fetchDestination } from './destination';

const jwt = jwt123.sign(
  JSON.stringify({ user_id: 'user', zid: 'tenant' }),
  privateKey,
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
    await expect(request()).resolves.toBeDefined();

    // Following attempts should fail
    for (let i = 0; i < attempts - 1; i++) {
      await expectToThrowWithRootCause(
        request,
        ({ message }) => message === 'Request failed with status code 400'
      );
    }

    // Last attempt should open the circuit breaker
    await expectToThrowWithRootCause(
      request,
      ({ message }) => message === 'Breaker is open'
    );
  });

  it('opens after 50% failed request attempts (with at least 10 recorded requests) for xsuaa service', async () => {
    const request = () => getClientCredentialsToken(xsuaaBindingMock);

    nock(providerXsuaaUrl)
      .post('/oauth/token')
      .times(1)
      .reply(200, { access_token: 'token' });

    nock(providerXsuaaUrl).post('/oauth/token').times(attempts).reply(400);

    // First attempt should succeed
    expect(await request()).toBeDefined();

    // Following attempts should fail
    for (let i = 0; i < attempts - 1; i++) {
      await expectToThrowWithRootCause(request, rootCause =>
        expect(rootCause).toBeUndefined()
      );
    }

    // Last attempt should open the circuit breaker
    await expectToThrowWithRootCause(
      request,
      ({ message }) => message === 'Breaker is open'
    );
  });
});

async function expectToThrowWithRootCause(
  fn: () => any,
  expectation: (rootCause: Error) => void
): Promise<void> {
  await expect(fn())
    .rejects.toThrowError()
    .catch(err => {
      expectation(err.rootCause);
    });
}
