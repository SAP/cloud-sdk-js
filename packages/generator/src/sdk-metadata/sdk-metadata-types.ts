/**
 * Represents the language independent header data of the sdk metadata
 */
export interface SdkMetadataHeader {
  /**
   * The unique identifier of the serivice which is the file name
   * @type {string}
   * @memberof SdkMetadataHeader
   */
  name: string;
  type: 'odata' | 'rest' | 'soap';
  version: string;
  /**
   * The first introduction text about the SDK on the API hub.
   */
  introText: string;
}

/**
 * Represents the language specific data of the sdk metadata
 */
export interface Client {
  language: 'java' | 'javascript';
  /**
   * Status of the service.
   * @memberof Client
   */
  serviceStatus: ServiceStatus;

  /**
   * This object will be set on our metadata server in case we need to show some emergency information.
   */
  emergencyObject?: EmergencyObject;

  /**
   * The information on the pregenerated library. Undefined if there is no lib generated
   * @type {PregeneratedLibrary}
   * @memberof Client
   */
  pregeneratedLibrary: PregeneratedLibrary | undefined;
  generationAndUsage: GenerationAndUsage;
}

export interface PregeneratedLibrary {
  /**
   * Version of the published client library e.g. "1.23.0"  - It uses the [[getVersionForClient]] method to get it
   * @type {string}
   * @memberof PregeneratedLibrary
   */
  version: string;
  generatedAt: DateTimeString;
  description: string;
  /**
   * Information how to install it via npm or maven
   * @type {string}
   * @memberof PregeneratedLibrary
   */
  installLibrarySteps: InstructionWithText;
  /**
   * Compatability version note. Is not filled yet since there is no flow to detect API changes since the versions are not maintend and the hash workaround is not yet in place.
   * @type {string}
   * @memberof PregeneratedLibrary
   */
  compatibilityNotes: '';
  repository: 'maven' | 'npm';
  repositoryLink: UrlString;
  dependencyName: string;
}

export interface Links {
  sdkDocumentation: LinkWithName;
  featureDocumentation: LinkWithName;
  support: LinkWithName;
  apiHubTutorial: LinkWithName;
  generationManual: LinkWithName;
}
export interface GenerationAndUsage {
  generatorVersion: string;
  generatorRepositoryLink: UrlString;
  generationSteps: InstructionWithText;
  apiSpecificUsage: InstructionWithText;
  genericUsage: InstructionWithText;
  links: Links;
}

export type UrlString = string;
/**
 * Type representing a DateTimeString in unix timestamp format: "/Date(1612342001106)/"
 */
export type DateTimeString = string;

/**
 * String fields containing a text formatted with multiple lines.
 */
export type MultiLineText = string;

export interface ServiceStatus {
  /**
   * certified -> Published lib, verified -> Generation worked
   */
  status: 'certified' | 'verified' | 'unknown';
  /**
   * Detailed text what the serviceStatus means.
   * @memberof Client
   */
  statusText: string;
  /**
   * Getting started text, depends on the service status
   */
  gettingStartedText: string;
}

interface LinkWithName {
  url: UrlString;
  name: string;
}

export interface EmergencyObject {
  status: string;
  description: string;
}

export interface InstructionWithText {
  instructions: MultiLineText;
  text: string;
}
