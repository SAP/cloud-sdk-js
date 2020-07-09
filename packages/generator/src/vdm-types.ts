/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike } from 'fs';
import { ODataVersion } from '@sap-cloud-sdk/util';

export interface VdmServiceMetadataHeader {
  oDataVersion: ODataVersion;
  namespace: string;
  originalFileName: string;
  servicePath: string;
  directoryName: string;
  npmPackageName: string;
  speakingModuleName: string;
  apiBusinessHubMetadata?: ApiBusinessHubMetadata | undefined;
  className: string;
  edmxPath: PathLike;
}

export interface VdmServiceMetadata extends VdmServiceMetadataHeader {
  entities: VdmEntity[];
  complexTypes: VdmComplexType[];
  functionImports: VdmFunctionImport[];
}

// Entity
export interface VdmEntity {
  entitySetName: string;
  entityTypeName: string;
  className: string;
  creatable: boolean;
  updatable: boolean;
  deletable: boolean;
  keys: VdmProperty[];
  properties: VdmProperty[];
  navigationProperties: VdmNavigationProperty[];
  description: string;
}

// Properties
export interface VdmPropertyDescriptor {
  originalName: string;
  instancePropertyName: string;
  propertyNameAsParam: string;
  staticPropertyName: string;
  isComplex?: boolean;
  isCollection: boolean;
}

export interface VdmPropertyValueConstraints {
  maxLength?: string;
  nullable: boolean;
}

export interface VdmProperty
  extends VdmPropertyDescriptor,
    VdmPropertyValueConstraints,
    VdmMappedEdmType {
  fieldType: string;
  description: string;
}

// Navigation Properties
export interface VdmNavigationProperty extends VdmPropertyDescriptor {
  from: string;
  to: string;
  toEntityClassName: string;
  /**
   * @deprecated Since v1.22.0. Will not be replaced.
   */
  multiplicity?: string;
  /**
   * @deprecated Since v1.22.0. Use `isCollection` instead.
   */
  isMultiLink?: boolean;
}

// Complex types and function imports
export interface VdmComplexType {
  originalName: string;
  properties: VdmProperty[];
  typeName: string;
  factoryName: string;
  fieldType: string;
}

export interface VdmFunctionWithoutReturnType {
  httpMethod: string;
  originalName: string;
  parameters: VdmParameter[];
  parametersTypeName: string;
  functionName: string;
  description: string;
}

export interface VdmFunctionImportReturnTypeNotParsed
  extends VdmFunctionWithoutReturnType {
  returnTypeEdmx: string;
}

export interface VdmFunctionImport extends VdmFunctionWithoutReturnType {
  returnType: VdmFunctionImportReturnType;
}

export interface VdmFunctionImportReturnType {
  builderFunction: string;
  returnType: string;
  /**
   * @deprecated Since v1.22.0. Use `isCollection` instead.
   */
  isMulti?: boolean;
  isCollection: boolean;
  returnTypeCategory: VdmFunctionImportReturnTypeCategory;
}

export enum VdmFunctionImportReturnTypeCategory {
  ENTITY,
  COMPLEX_TYPE,
  EDM_TYPE,
  VOID
}

export interface VdmParameter extends VdmMappedEdmType {
  originalName: string;
  parameterName: string;
  nullable: boolean;
  description: string;
}

export interface VdmMappedEdmType {
  edmType: string;
  jsType: string;
}

export interface ApiBusinessHubMetadata {
  url: string;
  communicationScenario: string | null;
  businessDocumentationUrl?: string;
}
