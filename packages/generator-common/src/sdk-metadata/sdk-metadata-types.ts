/**
 * Represents the language independent header data of the sdk metadata
 * @internal
 */
export interface SdkMetadataHeader {
  /**
   * The unique identifier of the service which is the file name.
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
 * @internal
 */
export interface Client {
  language: 'Java' | 'JavaScript';
  /**
   * Status of the service.
   */
  serviceStatus: ServiceStatus;

  /**
   * This object will be set on our metadata server in case we need to show some emergency information.
   */
  emergencyObject?: EmergencyObject;

  /**
   * The information on the pregenerated library. `undefined` if there is no lib generated/
   */
  pregeneratedLibrary: PregeneratedLibrary | undefined;
  generationAndUsage: GenerationAndUsage;
}

/**
 * @internal
 */
export interface PregeneratedLibrary {
  /**
   * Version of the published client library e.g. "1.23.0". It uses the [[getVersionForClient]] function to get it.
   */
  version: string;
  generatedAt: DateTimeString;
  description: string;
  /**
   * Information how to install it via npm or maven.
   */
  installLibrarySteps: InstructionWithTextAndHeader;
  /**
   * Compatibility version note. Is not filled yet since there is no flow to detect API changes since the versions are not maintained and the hash workaround is not yet in place.
   */
  compatibilityNotes: '';
  repository: 'Maven' | 'npm';
  repositoryLink: UrlString;
  dependencyName: string;
}

/**
 * @internal
 */
export interface Links {
  gettingStarted: LinkWithName;
  sdkDocumentation: LinkWithName;
  support: LinkWithName;
  generationManual: LinkWithName;
  overviewDocumentation: LinkWithName;
}

/**
 * @internal
 */
export interface GenerationAndUsage {
  generatorVersion: string;
  generatorRepositoryLink: UrlString;
  repository: 'Maven' | 'npm';
  generationSteps: InstructionWithTextAndHeader;
  apiSpecificUsage: InstructionWithTextAndHeader | undefined;
  genericUsage: InstructionWithTextAndHeader;
  links: Links;
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
   * `certified`: published libraries
   * `verified`: generation tested and succeeded
   * `unknown`: generation not tested
   * `failed`: generation tested and failed
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
  url: UrlString;
  name: string;
}

/**
 * This object will be filled at runtime on the sdk metadata server in case we have some code emergency which we want to inform the user base.
 * @internal
 */
export interface EmergencyObject {
  status: string;
  description: string;
}

/**
 *  Represents a instruction block e.g. generation steps with some text above the code block
 * @internal
 */
export interface InstructionWithText {
  instructions: MultiLineText;
  text: string;
}

/**
 *  Represents a instruction block e.g. generation steps with some text above the code block with a header
 * @internal
 */
export interface InstructionWithTextAndHeader extends InstructionWithText {
  header: string;
}
