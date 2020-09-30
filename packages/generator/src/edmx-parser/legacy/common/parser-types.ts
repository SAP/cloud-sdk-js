import { PathLike } from 'fs';
import { ODataVersion } from '@sap-cloud-sdk/util';

/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxMetadataBase {
  path: PathLike;
  oDataVersion: ODataVersion;
  fileName: string;
  namespace: string;
  selfLink?: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxMetadataBaseExtended extends EdmxMetadataBase {
  entitySets: EdmxEntitySetBase[];
  entityTypes: EdmxEntityTypeBase[];
  complexTypes: EdmxComplexTypeBase[];
  functionImports: EdmxFunctionImportBase[];
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEntityTypeBase extends EdmxNamed {
  Key: EdmxKey;
  Property: EdmxProperty[];
  NavigationProperty: any[];
  'sap:content-version': string;
  'sap:label'?: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxFunctionImportBase extends EdmxNamed {
  EntitySet?: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxParameter extends EdmxDocumented, EdmxNamed {
  Type: string;
  Nullable: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxComplexTypeBase extends EdmxNamed {
  Property: EdmxProperty[];
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEntitySetBase extends EdmxNamed {
  EntityType: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxKey {
  PropertyRef: EdmxNamed[];
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxNamed {
  Name: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxProperty extends EdmxDocumented, EdmxNamed {
  MaxLength: string;
  Nullable: string;
  'sap:creatable': string;
  'sap:filterable': string;
  'sap:label': string;
  'sap:sortable': string;
  'sap:unicode': string;
  'sap:updatable': string;
  'sap:quickinfo'?: string;
  Type: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxDocumented {
  Documentation?: {
    Summary: string;
    LongDescription: string;
  };
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface SwaggerMetadata {
  swagger: string;
  info: { [properties: string]: string };
  definitions: { [entities: string]: SwaggerEntity };
  paths: { [path: string]: { [method: string]: SwaggerPath } };
  basePath?: string;
  'x-sap-ext-overview': { [key: string]: any };
  externalDocs?: { description: string; url; string };
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface SwaggerEntity extends SwaggerDescribed {
  properties: { [fieldName: string]: SwaggerProperty };
  title: string;
  type?: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface SwaggerProperty extends SwaggerDescribed {
  type: string[];
  title?: string;
  example?: string;
  format?: string;
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface SwaggerPath {
  summary: string;
  parameters: SwaggerPathParameter[];
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface SwaggerPathParameter extends SwaggerDescribed {
  name: string;
  required: boolean;
  pattern?: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface SwaggerDescribed {
  description?: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface JoinedEntityMetadata {
  entitySet: EdmxEntitySetBase;
  entityType: EdmxEntityTypeBase;
  swaggerDefinition?: SwaggerEntity;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface ParsedServiceMetadata {
  edmx: EdmxMetadataBaseExtended;
  swagger?: SwaggerMetadata;
}
