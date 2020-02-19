/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { PathLike } from 'fs';

export interface ParsedServiceMetadata {
  edmx: EdmxMetadata;
  swagger?: SwaggerMetadata;
}

export interface EdmxMetadata {
  path: PathLike;
  fileName: string;
  namespace: string;
  entityTypes: EdmxEntityType[];
  entitySets: EdmxEntitySet[];
  associationSets: EdmxAssociationSet[];
  associations: EdmxAssociation[];
  functionImports: EdmxFunctionImport[];
  complexTypes: EdmxComplexType[];
  selfLink?: string;
}

export interface EdmxAssociation {
  Name: string;
  'sap:content-version': string;
  End: EdmxAssociationEnd[];
}

interface EdmxAssociationEnd {
  Type: string;
  Multiplicity: string;
  Role: string;
}

export interface EdmxAssociationSet {
  Name: string;
  Association: string;
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  End: EdmxAssociationSetEnd[];
}

interface EdmxAssociationSetEnd {
  Role: string;
  EntitySet: string;
}

export interface EdmxFunctionImport {
  Name: string;
  ReturnType: string;
  'm:HttpMethod': string;
  'sap:action-for': string;
  Parameter: EdmxParameter[];
  EntitySet?: string;
}

export interface EdmxParameter extends EdmxDocumented {
  Name: string;
  Type: string;
  Nullable: string;
}

export interface EdmxComplexType {
  Name: string;
  Property: EdmxProperty[];
}

export interface EdmxEntitySet {
  EntityType: string;
  Name: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}

export interface EdmxEntityType {
  Name: string;
  Key: EdmxKey;
  NavigationProperty: EdmxNavigationProperty[];
  Property: EdmxProperty[];
  'sap:content-version': string;
  'sap:label'?: string;
}

interface EdmxKey {
  PropertyRef: EdmxPropertyRef[];
}

export interface EdmxPropertyRef {
  Name: string;
}

interface EdmxNavigationProperty {
  FromRole: string;
  Name: string;
  Relationship: string;
  ToRole: string;
}

export interface EdmxProperty extends EdmxDocumented {
  MaxLength: string;
  Name: string;
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

export interface EdmxDocumented {
  Documentation?: {
    Summary: string;
    LongDescription: string;
  };
}

export interface SwaggerMetadata {
  swagger: string;
  info: { [properties: string]: string };
  definitions: { [entities: string]: SwaggerEntity };
  paths: { [path: string]: { [method: string]: SwaggerPath } };
  basePath?: string;
  'x-sap-ext-overview': { [key: string]: any };
  externalDocs?: { description: string; url; string };
}

export interface SwaggerEntity extends SwaggerDescribed {
  properties: { [fieldName: string]: SwaggerProperty };
  title: string;
  type?: string;
}

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

export interface SwaggerPath {
  summary: string;
  parameters: SwaggerPathParameter[];
}

export interface SwaggerPathParameter extends SwaggerDescribed {
  name: string;
  required: boolean;
  pattern?: string;
}

export interface SwaggerDescribed {
  description?: string;
}
