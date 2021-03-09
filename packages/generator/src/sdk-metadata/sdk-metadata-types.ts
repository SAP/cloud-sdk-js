export interface SdkMetadata {
  name: string; // API_BANKDETAIL_SRV
  type: 'odata' | 'rest' | 'soap';
  version: string;
  apiMetadata: ApiMetaData;
  clients: Client[];
}

interface ApiMetaData {
  id: string; // API_BANKDETAIL_SRV
  createdAt: DateTimeString;
  modifiedAt: DateTimeString;
  state: 'ACTIVE' | 'DEPRECATED' | 'DECOMISSIONED';
  url: UrlString; // "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BANKDETAIL_SRV"
  title: string; // "Bank - Read"
  shortText: string; // Enable external applications to read bank master data from your SAP S/4HANA Cloud system using this asynchronous inbound service
  serviceType: 'Cloud' | 'OnPremise'; //TODO discuss with Artem the purpose of this field
  typeVersion: string;
  directoryName: string; // bank-detail-service
  servicePath: string; // sap/opu/odata/sap/API_BANKDETAIL_SRV
  md5HashSums: {
    edmx?: string; // Odata
    json?: string; // OData,REST,SOAP
    yaml?: string; // REST
    wsdl?: string; // SOAP
  };
}

// If generationAndUsage is not possible  e.g. SOAP  service for JS we do not put it in the array
export interface Client {
  language: 'java' | 'javascript';
  pregeneratedLibrary: PregeneratedLibrary | undefined; // undefined if no pregenerated exists
  generationAndUsage: GenerationAndUsage;
}

export interface PregeneratedLibrary {
  version: string; // version of the client  library e.g. "1.23.0" - NOT the generator and NOT the API version
  generatedAt: DateTimeString;
  description: string; // "some-description-about-the-library",
  installLibrarySnippet: string; // "npm -i @sap/cloud-sdk-vdm-bank-detail-service" or  "<dependencies><br /><dependency><br /><groupId>com.sap.cloud.sdk.s4hana</groupId><br /><artifactId>s4hana-api-odata</artifactId><br /><version>use-latest-version-here</version><br /></dependency><br /></dependencies><br />",
  compatibilityNotes: '';// 'You have a minor version mismatch',...
  repository: 'maven' | 'npm';
  repositoryLink: UrlString; // "https://www.npmjs.com/package/@sap/cloud-sdk-vdm-bank-detail-service" or https://mvnrepository.com/artifact/com.sap.cloud.sdk.cloudplatform/cloudplatform-core
  dependencyName: string; // "@sap/cloud-sdk-vdm-bank-detail-service" or com.sap.cloud.sdk.cloudplatform/cloudplatform-core
}

export interface Links {
  sdkDocumentation: UrlString;
  featureDocumentation: UrlString;
  support: UrlString;
  apiHubTutorial: UrlString;
  generationManual: UrlString;
}

export interface GenerationAndUsage {
  successfulGenerationVerified: boolean; //we have tested the API spec with the generator -> true, false if not tested
  generationSteps: string; // "some-step<br />another step <br />another step"
  apiSpecificUsage: string;
  genericUsage: string; // import { <ServiceName> } from @sap/cloud-sdk-vdm-<service-name>-service<br /><ServiceName>.requestBuilder()<br />.<operationName>()<br />.execute(destination);
  links: Links;
}

type UrlString = string;
type DateTimeString = string; // "/Date(1612342001106)/"
