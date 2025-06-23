import { createLogger } from '@sap-cloud-sdk/util';
import { getJwtPair } from '../jwt';
import { serviceToken } from '../token-accessor';
import { getIssuerSubdomain } from '../subdomain-replacer';
import type { JwtPair } from '../jwt';
import type { JwtPayload } from '../jsonwebtoken-type';
import type { DestinationOptions } from './destination-accessor-types';

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
 * @param token - The token to check
 * @returns Whether the given token is a subscriber token.
 */
export function isSubscriberToken(token: any): token is SubscriberToken {
  return token.userJwt || token.serviceJwt;
}

/**
 * @internal
 */
export async function getSubscriberToken(
  options: DestinationOptions
): Promise<SubscriberToken> {
  const userJwt = await retrieveUserToken(options);
  const serviceJwt = await retrieveServiceToken(options, userJwt?.decoded);

  return { userJwt, serviceJwt };
}

async function retrieveUserToken(
  options: DestinationOptions
): Promise<JwtPair | undefined> {
  if (options.jwt) {
    return getJwtPair(options.jwt);
  }
}

async function retrieveServiceToken(
  options: DestinationOptions,
  decodedUserJwt: JwtPayload | undefined
): Promise<JwtPair | undefined> {
  const jwt = getJwtForServiceToken(options.iss, decodedUserJwt);

  if (jwt) {
    try {
      return getJwtPair(
        await serviceToken('destination', {
          ...options,
          jwt
        })
      );
    } catch (err) {
      logger.warn(
        `Failed to fetch subscriber service token for destination. This is only relevant if you are using subscriber destinations. Failure caused by: ${err.message}`
      );
    }
  }
}

function getJwtForServiceToken(iss?: string, decodedUserJwt?: JwtPayload) {
  if (iss) {
    logger.debug(
      'Using `iss` option instead of a full JWT to fetch a destination. No validation is performed.'
    );

    return { ext_attr: { zdn: getIssuerSubdomain({ iss }) } };
  }

  if (decodedUserJwt?.zid || decodedUserJwt?.app_tid) {
    return decodedUserJwt;
  }
}

/**
 * @internal
 * Get a subscriber token pair with required fields. Checks that at least one of the tokens exists and sets defaults if needed.
 * @returns The decoded subscriber tokens.
 */
export function getRequiredSubscriberToken(
  token: SubscriberToken | undefined
): Required<SubscriberToken> {
  if (token) {
    const { userJwt, serviceJwt } = token;

    const requiredToken = {
      userJwt: userJwt || serviceJwt,
      serviceJwt: serviceJwt || userJwt
    };

    if (isRequired(requiredToken)) {
      return requiredToken;
    }
  }

  throw new Error('Could not get subscriber token: Token value is undefined.');
}

/**
 * Type guard to check whether a token has both `userJwt` and `serviceJwt` defined.
 * @param token - Token to check.
 * @returns Whether both tokens are defined.
 */
function isRequired(
  token: SubscriberToken | undefined
): token is Required<SubscriberToken> {
  return !!(token?.userJwt && token.serviceJwt);
}

/**
 * @internal
 * Check whether the subscriber token has one of the tokens set
 * @param token - Subscriber token pair to check
 * @returns True if at least one of the tokens exist.
 */
export function hasTokens(token: SubscriberToken | undefined): boolean {
  return !!token?.userJwt || !!token?.serviceJwt;
}

/**
 * @internal
 * Retrieve the token to use for tenant identification.
 *
 * If `iss` or XSUAA user JWT was passed, this is the `serviceJwt`.
 * If a custom user JWT was passed, this is used.
 * @param token - The subscriber token for service and user.
 * @returns The decoded JWT to use for tenant identification.
 */
export function getJwtForTenant(token: Required<SubscriberToken>): JwtPair {
  return token.serviceJwt;
}

/**
 * @internal
 * Retrieve the token to use for user identification.
 *
 * If a user token was passed, this is used.
 * If only `iss` was passed try to get the user from the service token.
 * @param token - The subscriber token for service and user.
 * @returns The decoded JWT to use for user identification.
 */
export function getJwtForUser(token: Required<SubscriberToken>): JwtPair {
  return token.userJwt;
}
