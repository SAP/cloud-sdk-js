import {
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  TestTenants
} from './environment-mocks';
import { signedJwtForVerification } from './keys';

const iat = Math.floor(Date.now() / 1000);

const jku = 'https://my-jku-url.authentication.sap.hana.ondemand.com';

export const providerServiceTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: TestTenants.PROVIDER
};

export const providerServiceToken = signedJwtForVerification(
  providerServiceTokenPayload,
  jku
);

export const subscriberServiceTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER
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
  zid: TestTenants.SUBSCRIBER_ONLY_ISS
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
  zid: TestTenants.PROVIDER,
  user_id: 'service-prov-approved'
};

export const userApprovedProviderServiceToken = signedJwtForVerification(
  userApprovedProviderTokenPayload,
  jku
);

const userApprovedSubscriberTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER,
  user_id: 'service-sub-approved'
};

export const userApprovedSubscriberServiceToken = signedJwtForVerification(
  userApprovedSubscriberTokenPayload,
  jku
);

export const providerUserPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: TestTenants.PROVIDER,
  user_id: 'user-prov'
};

export const providerUserJwt = signedJwtForVerification(
  providerUserPayload,
  jku
);

export const subscriberUserPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER,
  user_id: 'user-sub'
};

export const subscriberUserJwt = signedJwtForVerification(
  subscriberUserPayload,
  jku
);

const subscriberJwtTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER,
  user_id: 'jwt-sub'
};

const providerJwtTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: TestTenants.PROVIDER,
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
