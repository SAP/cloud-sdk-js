import {
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  testTenants,
  xsuaaBindingMock
} from './environment-mocks';
import { signedJwtForVerification } from './keys';

const iat = Math.floor(Date.now() / 1000);

// simple provider case (XSUAA)
export const providerServiceTokenPayload = {
  iat, // check if needed
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  ext_attr: { enhancer: 'XSUAA' }
};

export const providerServiceToken = signedJwtForVerification(
  providerServiceTokenPayload
);

// simple subscriber case (XSUAA)
export const subscriberServiceTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  ext_attr: { enhancer: 'XSUAA' }
};

export const subscriberServiceToken = signedJwtForVerification(
  subscriberServiceTokenPayload
);

// case? only difference iat missing => relevant for mocked function that looks at URL
/**
 * These tokens are used to test cases when the provided user JWT only contains `{ iss: someXSUAAurl }`.
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

export const subscriberServiceTokenWithVerificationURL =
  signedJwtForVerification(subscriberServiceTokenPayload);

// simple case provider (XSUAA) + user_id => rename (not approved)
const userApprovedProviderTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'service-prov-approved',
  ext_attr: { enhancer: 'XSUAA' }
};

export const userApprovedProviderServiceToken = signedJwtForVerification(
  userApprovedProviderTokenPayload
);

// simple case subscriber (XSUAA) + user_id
const userApprovedSubscriberTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  user_id: 'service-sub-approved',
  ext_attr: { enhancer: 'XSUAA' }
};

export const userApprovedSubscriberServiceToken = signedJwtForVerification(
  userApprovedSubscriberTokenPayload
);

// case? userApprovedProviderTokenPayload difference currently: not XSUAA (just because I added it), but URL still XSUAA
export const providerUserPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'user-prov'
};

export const providerUserJwt = signedJwtForVerification(providerUserPayload);

// case? XSUAA or not? difference to userApprovedSubscriberTokenPayload?
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
  subscriberUserPayload
);

// custom case, no XSUAA + user_id
const customSubscriberUserPayload = {
  user_id: 'user-sub',
  jwksUri: 'http://jwks.example.com',
  jwks: 'JWKS'
};

export const customSubscriberUserJwt = signedJwtForVerification(
  customSubscriberUserPayload,
  customSubscriberUserPayload.jwksUri
);

// case? difference to userApprovedSubscriberTokenPayload?
const subscriberJwtTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: testTenants.subscriber,
  user_id: 'jwt-sub'
};

// case? difference to userApprovedProviderTokenPayload
const providerJwtTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: testTenants.provider,
  user_id: 'jwt-prov'
};

export const providerJwtBearerToken = signedJwtForVerification(
  providerJwtTokenPayload
);

export const subscriberJwtBearerToken = signedJwtForVerification(
  subscriberJwtTokenPayload
);

// How is this IAS? => seems odd, same as providerJwtBearerToken
export const iasToken = signedJwtForVerification(providerJwtTokenPayload);
