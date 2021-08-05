import { Destination } from './destination/destination-service-types';
import { clientCredentialsGrant } from './xsuaa-service';
import {
  ClientCredentials,
  ClientCredentialsResponse
} from './xsuaa-service-types';

/**
 * @deprecated Since v1.47.0.
 * Retrieves an access token required for "OAuth2ClientCredentials" destination authentication type.
 *
 * @param destination - A destination having `OAuth2ClientCredentials` authentication type
 * @returns A promise returning the requested access token on success.
 */
export async function getOAuth2ClientCredentialsToken(
  destination: Destination
): Promise<ClientCredentialsResponse> {
  if (!areValidCredentials(destination)) {
    throw new Error(
      'The provided destination does not comply to "OAuth2ClientCredentials" authentication requirements. Check whether the destination includes the `tokenServiceUrl`, `clientId`, and `clientSecret` attributes.'
    );
  }

  if (!destination.tokenServiceUrl) {
    throw new Error(
      'The property `tokenServiceUrl` of the destination is undefined.'
    );
  }

  return clientCredentialsGrant(
    destination.tokenServiceUrl!,
    getTokenServiceCredentials(destination),
    {},
    {
      client_id: destination.clientId,
      client_secret: destination.clientSecret
    }
  );
}

function areValidCredentials(destination: Destination): boolean {
  return !!(
    destination.tokenServiceUrl &&
    destination.clientId &&
    destination.clientSecret
  );
}

function getTokenServiceCredentials(
  destination: Destination
): ClientCredentials {
  if (destination.tokenServiceUser && destination.tokenServicePassword) {
    return {
      username: destination.tokenServiceUser,
      password: destination.tokenServicePassword
    };
  }
  if (destination.clientId && destination.clientSecret) {
    return {
      username: destination.clientId,
      password: destination.clientSecret
    };
  }

  throw new Error(
    'Either `tokenServiceUser`/`tokenServicePassword` or `clientId`/`clientSecret` should be defined.'
  );
}
