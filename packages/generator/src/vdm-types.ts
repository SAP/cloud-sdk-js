import { PathLike } from 'fs';
import { ODataVersion } from '@sap-cloud-sdk/util';
/**
 * @internal
 */
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
/**
 * @internal
 */
export interface VdmServiceEntities {
  entities: VdmEntity[];
  complexTypes: VdmComplexType[];
  enumTypes: VdmEnumType[];
  functionImports: VdmFunctionImport[];
  actionImports?: VdmActionImport[];
}
/**
 * @internal
 */
export type VdmServiceMetadata = VdmServicePackageMetaData & VdmServiceEntities;

/**
 * Entity
 * @internal
 */
export interface VdmEntity {
  // todo uniqueness check like request builder
  // apiName: string;
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

/**
 * Properties
 * @internal
 */
export interface VdmPropertyDescriptor {
  originalName: string;
  instancePropertyName: string;
  propertyNameAsParam: string;
  staticPropertyName: string;
  isComplex?: boolean;
  isEnum?: boolean;
  isCollection: boolean;
}
/**
 * @internal
 */
export interface VdmPropertyValueConstraints {
  maxLength?: string;
  nullable: boolean;
}
/**
 * @internal
 */
export interface VdmProperty
  extends VdmPropertyDescriptor,
    VdmPropertyValueConstraints,
    VdmMappedEdmType {
  description: string;
}

/**
 * Navigation Properties
 * @internal
 */
export interface VdmNavigationProperty extends VdmPropertyDescriptor {
  from: string;
  to: string;
  toEntityClassName: string;
}
/**
 * @internal
 */
export interface VdmEnumMemberType {
  name: string;
  originalValue: string;
}
/**
 * @internal
 */
export interface VdmEnumType {
  originalName: string;
  typeName: string;
  underlyingType: string;
  members: VdmEnumMemberType[];
}

/**
 * Complex types and function imports
 * @internal
 */
export interface VdmComplexType {
  originalName: string;
  properties: VdmProperty[];
  typeName: string;
  fieldType: string;
  namespace: string;
}
/**
 * @internal
 */
export interface VdmFunctionImportBase {
  originalName: string;
  parameters: VdmParameter[];
  parametersTypeName: string;
  name: string;
  description: string;
}
/**
 * @internal
 */
export type VdmActionImportBase = VdmFunctionImportBase;
/**
 * @internal
 */
export interface VdmFunctionImport extends VdmFunctionImportBase {
  httpMethod: string;
  returnType: VdmFunctionImportReturnType;
}
/**
 * @internal
 */
export type VdmActionImport = VdmFunctionImport;
/**
 * @internal
 */
export type VdmActionImportReturnType = VdmFunctionImportReturnType;
/**
 * @internal
 */
export type VdmActionFunctionImportReturnType =
  | VdmActionImportReturnType
  | VdmFunctionImportReturnType;
/**
 * @internal
 */
export interface VdmFunctionImportReturnType {
  builderFunction?: string;
  returnType: string;
  isCollection: boolean;
  isNullable: boolean;
  returnTypeCategory: VdmReturnTypeCategory;
  unsupportedReason?: VdmUnsupportedReason;
}
/**
 * @internal
 */
export enum VdmReturnTypeCategory {
  ENTITY,
  COMPLEX_TYPE,
  EDM_TYPE,
  VOID,
  NEVER
}
/**
 * @internal
 */
export enum VdmUnsupportedReason {
  ENTITY_NOT_DESERIALIZABLE
}
/**
 * @internal
 */
export interface VdmParameter extends VdmMappedEdmType {
  originalName: string;
  parameterName: string;
  nullable: boolean;
  description: string;
}
/**
 * @internal
 */
export interface VdmMappedEdmType {
  edmType: string;
  jsType: string;
  fieldType: string;
}
/**
 * @internal
 */
export interface ApiBusinessHubMetadata {
  url: string;
  communicationScenario: string | null;
  businessDocumentationUrl?: string;
}
