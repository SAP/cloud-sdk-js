/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
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

export const subscriberServiceTokenWithVerificationURL = signedJwtForVerification(
  subscriberServiceTokenPayload,
  'https://some-jku-url.com'
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
