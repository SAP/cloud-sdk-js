import { createLogger } from '@sap-cloud-sdk/util';
import { signedJwt } from '../../../../../test-resources/test/test-util';
import { addForwardedAuthTokenIfNeeded } from './forward-auth-token';
import type { Destination } from './destination-service-types';

describe('forward auth token', () => {
  it('sets an auth token, when `forwardAuthToken` is set', () => {
    const jwt = signedJwt({});
    let destination: Destination = { forwardAuthToken: true };
    destination = addForwardedAuthTokenIfNeeded(destination, jwt);
    expect(destination.authTokens?.[0]).toMatchObject({ value: jwt });
  });

  it('does not set an auth token, when `forwardAuthToken` is not set', () => {
    const jwt = signedJwt({});
    let destination: Destination = {};
    destination = addForwardedAuthTokenIfNeeded({}, jwt);
    expect(destination.authTokens).toBeUndefined();
  });

  it('shows a warning if `forwardAuthToken` is enabled, but no JWT is passed', () => {
    const logger = createLogger({
      messageContext: 'forward-auth-token'
    });

    const warnSpy = jest.spyOn(logger, 'warn');
    addForwardedAuthTokenIfNeeded({ forwardAuthToken: true });
    expect(warnSpy).toHaveBeenCalledWith(
      "Option 'forwardAuthToken' was set on destination but no token was provided to forward. This is most likely unintended and will lead to an authorization error on request execution."
    );
  });
});
