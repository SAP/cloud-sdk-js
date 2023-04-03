import { createLogger } from '@sap-cloud-sdk/util';
import {
  decodeJwtComplete,
  getJwtPair,
  isXsuaaToken,
  JwtPair,
  verifyJwt
} from '../jwt';
import { serviceToken } from '../token-accessor';
import { DestinationOptions } from './destination-accessor-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-accessor-service'
});

/**
 * @internal
 * When a destination is fetched from the SDK the user can pass different tokens.
 * The token determines from which tenant the destination is obtained (provider or subscriber) and if it contains user information so that user propagation flows are possible.
 * Possible types are: A user specific JWT issued by the XSUAA, a JWT from a custom IdP or only the `iss` property to get destinations from a different tenant.
 * We name these tokens "subscriber tokens", because they are related to the subscriber account in contrast to the "provider account", where the application is running.
 * The tenant defined in the subscriber token is the provider tenant for single tenant applications.
 */
export interface SubscriberToken {
  /**
   * Token that represents the user.
   */
  userJwt?: JwtPair;

  /**
   * Destination service token.
   */
  serviceJwt?: JwtPair;
}

/**
 * @internal
 */
export async function getSubscriberToken(
  options: DestinationOptions
): Promise<SubscriberToken | undefined> {
  const isXsuaaJwt =
    !!options.jwt && isXsuaaToken(decodeJwtComplete(options.jwt));

  return {
    userJwt: await retrieveUserToken(options, isXsuaaJwt),
    serviceJwt: await retrieveServiceToken(options, isXsuaaJwt)
  };
}

async function retrieveUserToken(
  options: DestinationOptions,
  isXsuaaJwt: boolean
): Promise<JwtPair | undefined> {
  if (options.jwt) {
    if (!options.iss && isXsuaaJwt) {
      await verifyJwt(options.jwt, options);
    }
    return getJwtPair(options.jwt);
  }
}

async function retrieveServiceToken(
  options: DestinationOptions,
  isXsuaaJwt: boolean
): Promise<JwtPair | undefined> {
  const jwt = getJwtForServiceToken(options, isXsuaaJwt);

  if (jwt) {
    return getJwtPair(
      await serviceToken('destination', {
        ...options,
        jwt
      })
    );
  }
}

function getJwtForServiceToken(
  options: DestinationOptions,
  isXsuaaJwt: boolean
) {
  if (options.iss) {
    logger.debug(
      'Using `iss` option instead of a full JWT to fetch a destination. No validation is performed.'
    );

    return { iss: options.iss };
  }
  if (options.jwt && isXsuaaJwt) {
    return options.jwt;
  }
}
