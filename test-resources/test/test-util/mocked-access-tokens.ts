import {
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  testTenants,
  xsuaaBindingMock
} from './environment-mocks';
import { signedJwtForVerification } from './keys';

const iat = Math.floor(Date.now() / 1000);

export const providerServiceTokenPayload = {
  iat, // check if needed
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  ext_attr: { enhancer: 'XSUAA' }
};

export const providerServiceToken = signedJwtForVerification(
  providerServiceTokenPayload
);

export const subscriberServiceTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  ext_attr: { enhancer: 'XSUAA' }
};

export const subscriberServiceToken = signedJwtForVerification(
  subscriberServiceTokenPayload
);

/**
 * These tokens are used to test cases when the provided user JWT only contains `{ iss: someXSUAAurl }`.
 * Issuer URL is relevant for `mockServiceToken()`
 * See docs on {@link DestinationAccessorOptions} for more details.
 */
export const onlyIssuerServiceTokenPayload = {
  iss: onlyIssuerXsuaaUrl,
  zid: testTenants.subscriberOnlyIss,
  ext_attr: { enhancer: 'XSUAA' }
};

export const onlyIssuerServiceToken = signedJwtForVerification(
  onlyIssuerServiceTokenPayload
);

export const providerUserPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'user-prov',
  ext_attr: { enhancer: 'XSUAA' }
};

export const providerUserToken = signedJwtForVerification(providerUserPayload);

export const subscriberUserPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  user_id: 'user-sub',
  // The client and audience are necessary if XSSEC validates the token
  azp: xsuaaBindingMock.credentials.clientid, // Becomes clientId in XSSEC
  client_id: xsuaaBindingMock.credentials.clientid, // Client_ID of the subscriber token has to match the XSUAA credentials
  aud: [xsuaaBindingMock.credentials.xsappname], // Becomes audience in XSSEC
  ext_attr: { enhancer: 'XSUAA' }
};

export const subscriberUserToken = signedJwtForVerification(
  subscriberUserPayload
);

export const customSubscriberUserTokenPayload = {
  user_id: 'user-sub',
  jwksUri: 'http://jwks.example.com',
  jwks: 'JWKS'
};

export const customSubscriberUserToken = signedJwtForVerification(
  customSubscriberUserTokenPayload,
  customSubscriberUserTokenPayload.jwksUri
);
