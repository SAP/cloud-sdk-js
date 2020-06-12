/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike } from 'fs';

export interface EdmxMetadataBase {
  path: PathLike;
  oDataVersion: 'v2' | 'v4';
  fileName: string;
  namespace: string;
  selfLink?: string;
}

export interface EdmxMetadataBaseExtended extends EdmxMetadataBase {
  entitySets: EdmxEntitySetBase[];
  entityTypes: EdmxEntityTypeBase[];
  complexTypes: EdmxComplexTypeBase[];
  functionImports: EdmxFunctionImportBase[];
}

export interface EdmxEntityTypeBase extends EdmxNamed {
  Key: EdmxKey;
  Property: EdmxProperty[];
  NavigationProperty: any[];
  'sap:content-version': string;
  'sap:label'?: string;
}

export interface EdmxFunctionImportBase extends EdmxNamed {
  ReturnType: string;
  'sap:action-for': string;
  Parameter: EdmxParameter[];
  EntitySet?: string;
}

export interface EdmxParameter extends EdmxDocumented, EdmxNamed {
  Type: string;
  Nullable: string;
}

export interface EdmxComplexTypeBase extends EdmxNamed {
  Property: EdmxProperty[];
}

export interface EdmxEntitySetBase extends EdmxNamed {
  EntityType: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}

export interface EdmxKey {
  PropertyRef: EdmxNamed[];
}

export interface EdmxNamed {
  Name: string;
}

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

export interface JoinedEntityMetadata {
  entitySet: EdmxEntitySetBase;
  entityType: EdmxEntityTypeBase;
  swaggerDefinition?: SwaggerEntity;
}
