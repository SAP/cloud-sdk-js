import {
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  testTenants,
  xsuaaBindingMock
} from './environment-mocks';
import { signedJwtForVerification } from './keys';

const iat = Math.floor(Date.now() / 1000);

const jku = 'https://my-jku-url.authentication.sap.hana.ondemand.com';

export const providerServiceTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider
};

export const providerServiceToken = signedJwtForVerification(
  providerServiceTokenPayload,
  jku
);

export const subscriberServiceTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber
};

export const subscriberServiceToken = signedJwtForVerification(
  subscriberServiceTokenPayload,
  jku
);

/**
 * These tokens are used to test cases when the provided user JWT only contains `{ iss: someXSUAAurl }`.
 * See docs on {@link DestinationAccessorOptions} for more details.
 */
export const onlyIssuerServiceTokenPayload = {
  iss: onlyIssuerXsuaaUrl,
  zid: testTenants.subscriberOnlyIss
};

export const onlyIssuerServiceToken = signedJwtForVerification(
  onlyIssuerServiceTokenPayload,
  jku
);

export const subscriberServiceTokenWithVerificationURL =
  signedJwtForVerification(subscriberServiceTokenPayload, jku);

const userApprovedProviderTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'service-prov-approved'
};

export const userApprovedProviderServiceToken = signedJwtForVerification(
  userApprovedProviderTokenPayload,
  jku
);

const userApprovedSubscriberTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  user_id: 'service-sub-approved'
};

export const userApprovedSubscriberServiceToken = signedJwtForVerification(
  userApprovedSubscriberTokenPayload,
  jku
);

export const providerUserPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'user-prov'
};

export const providerUserJwt = signedJwtForVerification(
  providerUserPayload,
  jku
);

export const subscriberUserPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  user_id: 'user-sub',
  // The client and audience are necessary if XSSEC validates the token
  azp: xsuaaBindingMock.credentials.clientid, // Becomes clientId in XSSEC
  aud: [xsuaaBindingMock.credentials.clientid] // Becomes audience in XSSEC
};

export const subscriberUserJwt = signedJwtForVerification(
  subscriberUserPayload,
  jku
);

const customSubscriberUserPayload = {
  user_id: 'user-sub',
  jwksUri: 'http://jwks.example.com',
  jwks: 'JWKS'
};

export const customSubscriberUserJwt = signedJwtForVerification(
  customSubscriberUserPayload,
  customSubscriberUserPayload.jwksUri
);

const subscriberJwtTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  user_id: 'jwt-sub'
};

const providerJwtTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'jwt-prov'
};

export const providerJwtBearerToken = signedJwtForVerification(
  providerJwtTokenPayload,
  jku
);

export const subscriberJwtBearerToken = signedJwtForVerification(
  subscriberJwtTokenPayload,
  jku
);

export const iasToken = signedJwtForVerification(providerJwtTokenPayload, jku);
