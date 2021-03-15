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
}

/**
 * Represents the language specific data of the sdk metadata
 */
export interface Client {
  language: 'java' | 'javascript';
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
  installLibrarySnippet: MultiLineText;
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
  sdkDocumentation: UrlString;
  featureDocumentation: UrlString;
  support: UrlString;
  apiHubTutorial: UrlString;
  generationManual: UrlString;
}

export interface GenerationAndUsage {
  successfulGenerationVerified: boolean;
  generationSteps: string;
  apiSpecificUsage: MultiLineText;
  genericUsage: MultiLineText;
  links: Links;
}

type UrlString = string;
/**
 * Type representing a DateTimeString in unix timestamp format: "/Date(1612342001106)/"
 */
type DateTimeString = string;

/**
 * String fields containing a text formatted with multiple lines.
 */
type MultiLineText = string;
