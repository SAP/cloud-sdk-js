/**
 * Represents the language specific data of the sdk metadata
 * @internal
 */
export interface Client {
  /**
   * @internal
   */
  apiType: 'OData' | 'OpenAPI';
  /**
   * @internal
   */
  language: 'Java' | 'JavaScript';
  /**
   * Status of the service.
   */
  serviceStatus: 'certified' | 'verified' | 'unknown' | 'failed';
  /**
   * This object will be set on our metadata server in case we need to show some emergency information.
   */
  emergencyObject?: EmergencyObject;
  /**
   * @internal
   */
  generatorVersion: string;
  /**
   * @internal
   */
  apiSpecificUsage: string | undefined;
}

/**
 * @internal
 */
export interface Links {
  /**
   * @internal
   */
  gettingStarted: LinkWithName;
  /**
   * @internal
   */
  sdkDocumentation: LinkWithName;
  /**
   * @internal
   */
  support: LinkWithName;
  /**
   * @internal
   */
  generationManual: LinkWithName;
  /**
   * @internal
   */
  overviewDocumentation: LinkWithName;
}

/**
 * @internal
 */
export type UrlString = string;
/**
 * Type representing a DateTimeString in unix timestamp format: "/Date(1612342001106)/"
 * @internal
 */
export type DateTimeString = string;

/**
 * String fields containing a text formatted with multiple lines.
 * @internal
 */
export type MultiLineText = string;

/**
 * @internal
 */
export interface ServiceStatus {
  /**
   * Generation status of the service:
   * `certified`: published libraries.
   * `verified`: generation tested and succeeded.
   * `unknown`: generation not tested.
   * `failed`: generation tested and failed.
   *
   */
  status: 'certified' | 'verified' | 'unknown' | 'failed';
  /**
   * Detailed text what the serviceStatus means.
   */
  statusText: string;
  /**
   * Like the short version but more information.
   */
  statusLongText: string;
}

/**
 * Representation of a link with a descriptive name.
 * @internal
 */
interface LinkWithName {
  /**
   * @internal
   */
  url: UrlString;
  /**
   * @internal
   */
  name: string;
}

/**
 * This object will be filled at runtime on the sdk metadata server in case we have some code emergency which we want to inform the user base.
 * @internal
 */
export interface EmergencyObject {
  /**
   * @internal
   */
  status: string;
  /**
   * @internal
   */
  description: string;
}
