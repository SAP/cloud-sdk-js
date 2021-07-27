/**
 * Represents the language independent header data of the sdk metadata
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
 */
export interface Client {
  language: 'Java' | 'JavaScript';
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
  repository: 'Maven' | 'npm';
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
  repository: 'Maven' | 'npm';
  generationSteps: InstructionWithText;
  apiSpecificUsage: InstructionWithTextAndHeader | undefined;
  genericUsage: InstructionWithTextAndHeader;
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
  status: 'certified' | 'verified' | 'unknown' | 'failed';
  /**
   * Detailed text what the serviceStatus means.
   * @memberof Client
   */
  statusText: string;
  /**
   * Like the short version but more information.
   * @memberof Client
   */
  statusLongText: string;
}

/**
 * Representation of a link with a descriptive name.
 */
interface LinkWithName {
  url: UrlString;
  name: string;
}

/**
 * This object will be filled at runtime on the sdk metadata server in case we have some code emergency which we want to inform the user base.
 */
export interface EmergencyObject {
  status: string;
  description: string;
}

/**
 *  Represents a instruction block e.g. generation steps with some text above the code block
 */
export interface InstructionWithText {
  instructions: MultiLineText;
  text: string;
}

/**
 *  Represents a instruction block e.g. generation steps with some text above the code block with a header
 */
export interface InstructionWithTextAndHeader extends InstructionWithText {
  header: string;
}
