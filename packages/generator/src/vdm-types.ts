import { PathLike } from 'fs';
import { ODataVersion } from '@sap-cloud-sdk/util';

export interface VdmServicePackageMetaData {
  oDataVersion: ODataVersion;
  namespaces: string[];
  originalFileName: string;
  servicePath: string;
  directoryName: string;
  npmPackageName: string;
  speakingModuleName: string;
  apiBusinessHubMetadata?: ApiBusinessHubMetadata | undefined;
  className: string;
  edmxPath: PathLike;
}

export interface VdmServiceEntities {
  entities: VdmEntity[];
  complexTypes: VdmComplexType[];
  enumTypes: VdmEnumType[];
  functionImports: VdmFunctionImport[];
  actionsImports?: VdmActionImport[];
}

export type VdmServiceMetadata = VdmServicePackageMetaData & VdmServiceEntities;

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
  entityTypeNamespace: string;
}

// Properties
export interface VdmPropertyDescriptor {
  originalName: string;
  instancePropertyName: string;
  propertyNameAsParam: string;
  staticPropertyName: string;
  isComplex?: boolean;
  isEnum?: boolean;
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

export interface VdmEnumMemberType {
  name: string;
  originalValue: string;
}

export interface VdmEnumType {
  originalName: string;
  typeName: string;
  underlyingType: string;
  members: VdmEnumMemberType[];
}

// Complex types and function imports
export interface VdmComplexType {
  originalName: string;
  properties: VdmProperty[];
  typeName: string;
  factoryName: string;
  fieldType: string;
  namespace: string;
}

export interface VdmFunctionImportBase {
  originalName: string;
  parameters: VdmParameter[];
  parametersTypeName: string;
  name: string;
  description: string;
}

export type VdmActionImportBase = VdmFunctionImportBase;

export interface VdmFunctionImport extends VdmFunctionImportBase {
  httpMethod: string;
  returnType: VdmFunctionImportReturnType;
}

export type VdmActionImport = VdmFunctionImport;

export type VdmActionImportReturnType = VdmFunctionImportReturnType;

export type VdmActionFunctionImportReturnType =
  | VdmActionImportReturnType
  | VdmFunctionImportReturnType;

export interface VdmFunctionImportReturnType {
  builderFunction?: string;
  returnType: string;
  /**
   * @deprecated Since v1.22.0. Use `isCollection` instead.
   */
  isMulti?: boolean;
  isCollection: boolean;
  isNullable: boolean;
  returnTypeCategory: VdmReturnTypeCategory;
  unsupportedReason?: VdmUnsupportedReason;
}

export enum VdmReturnTypeCategory {
  ENTITY,
  COMPLEX_TYPE,
  EDM_TYPE,
  VOID,
  NEVER
}

export enum VdmUnsupportedReason {
  ENTITY_NOT_DESERIALIZABLE
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
  fieldType: string;
}

export interface ApiBusinessHubMetadata {
  url: string;
  communicationScenario: string | null;
  businessDocumentationUrl?: string;
}
