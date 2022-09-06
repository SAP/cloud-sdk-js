/**
 * Unspecific representation of a service as read from VCAP_SERVICES (for Cloud Foundry) or mounted secrets (for K8S).
 */
export interface Service {
  [other: string]: any;
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The label of the service.
   */
  label: string;
  /**
   * The tags of the service.
   */
  tags: string[];
  /**
   * The service credentials.
   */
  credentials: ServiceCredentials;
}

/**
 * Unspecific representation of a service's credentials as read from VCAP_SERVICES (for Cloud Foundry) or mounted secrets (for K8S).
 */
export type ServiceCredentials = {
  [other: string]: any;
  clientid: string;
} & (
  | {
      clientsecret: string;
    }
  | {
      certificate: string;
      key: string;
    }
);

/**
 * Credentials for the Destination service.
 * @internal
 */
export type DestinationServiceCredentials = ServiceCredentials & {
  identityzone: string;
  instanceid: string;
  tenantid: string;
  tenantmode: string;
  uaadomain: string;
  uri: string;
  url: string;
  verificationkey: string;
  xsappname: string;
};

/**
 * Credentials for the XSUAA service.
 */
export type XsuaaServiceCredentials = ServiceCredentials & {
  identityzone: string;
  identityzoneid: string;
  sburl: string;
  tenantid: string;
  tenantmode: string;
  uaadomain: string;
  url: string;
  verificationkey: string;
  xsappname: string;
};
