/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * Unspecific representation of a service as read from VCAP_SERVICES (for Cloud Foundry) or mounted secrets (for K8S).
 */
export interface Service {
  name: string;
  label: string;
  tags: string[];
  credentials: ServiceCredentials;
  [other: string]: any;
}

/**
 * Unspecific representation of a service's credentials as read from VCAP_SERVICES (for Cloud Foundry) or mounted secrets (for K8S).
 */
export interface ServiceCredentials {
  clientid: string;
  clientsecret: string;
  [other: string]: any;
}

/**
 * Credentials for the Destination service.
 */
export interface DestinationServiceCredentials {
  clientid: string;
  clientsecret: string;
  identityzone: string;
  instanceid: string;
  tenantid: string;
  tenantmode: string;
  uaadomain: string;
  uri: string;
  url: string;
  verificationkey: string;
  xsappname: string;
}

/**
 * Credentials for the XSUAA service.
 */
export interface XsuaaServiceCredentials {
  clientid: string;
  clientsecret: string;
  identityzone: string;
  identityzoneid: string;
  sburl: string;
  tenantid: string;
  tenantmode: string;
  uaadomain: string;
  url: string;
  verificationkey: string;
  xsappname: string;
}
