import {
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  TestTenants
} from './environment-mocks';
import { signedJwt, signedJwtForVerification } from './keys';

const iat = Math.floor(Date.now() / 1000);

const providerServiceTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: TestTenants.PROVIDER,
  user_id: 'service-prov'
};

export const providerServiceToken = signedJwt(providerServiceTokenPayload);

const subscriberServiceTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER,
  user_id: 'service-sub'
};

export const subscriberServiceToken = signedJwt(subscriberServiceTokenPayload);

// These tokens are used to test cases when the provided user JWT only contains `{ iss: someXSUAAurl }`.
// See docs on [[DestinationAccessorOptions]] for mor details
export const onlyIssuerServiceTokenPayload = {
  iat,
  iss: onlyIssuerXsuaaUrl,
  zid: TestTenants.SUBSCRIBER
};

export const onlyIssuerServiceToken = signedJwt(onlyIssuerServiceTokenPayload);

export const subscriberServiceTokenWithVerificationURL =
  signedJwtForVerification(
    subscriberServiceTokenPayload,
    'https://my-jku-url.authentication.sap.hana.ondemand.com'
  );

const userApprovedProviderTokenPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: TestTenants.PROVIDER,
  user_id: 'service-prov-approvded'
};

export const userApprovedProviderServiceToken = signedJwt(
  userApprovedProviderTokenPayload
);

const userApprovedSubscriberTokenPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER,
  user_id: 'service-sub-approvded'
};

export const userApprovedSubscriberServiceToken = signedJwt(
  userApprovedSubscriberTokenPayload
);

const providerUserPayload = {
  iat,
  iss: providerXsuaaUrl,
  zid: TestTenants.PROVIDER,
  user_id: 'user-prov'
};

export const providerUserJwt = signedJwt(providerUserPayload);

const subscriberUserPayload = {
  iat,
  iss: subscriberXsuaaUrl,
  zid: TestTenants.SUBSCRIBER,
  user_id: 'user-sub'
};

export const subscriberUserJwt = signedJwt(subscriberUserPayload);

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

export const providerJwtBearerToken = signedJwt(providerJwtTokenPayload);

export const subscriberJwtBearerToken = signedJwt(subscriberJwtTokenPayload);
