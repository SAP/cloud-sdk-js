import { PathLike } from 'fs';
import { ODataVersion } from '@sap-cloud-sdk/util';
/**
 * @internal
 */
export interface VdmServicePackageMetaData {
  /**
   * @internal
   */
  oDataVersion: ODataVersion;
  /**
   * @internal
   */
  namespaces: string[];
  /**
   * @internal
   */
  originalFileName: string;
  /**
   * @internal
   */
  servicePath: string;
  /**
   * @internal
   */
  directoryName: string;
  /**
   * @internal
   */
  npmPackageName: string;
  /**
   * @internal
   */
  speakingModuleName: string;
  /**
   * @internal
   */
  apiBusinessHubMetadata?: ApiBusinessHubMetadata | undefined;
  /**
   * @internal
   */
  className: string;
  /**
   * @internal
   */
  edmxPath: PathLike;
}
/**
 * @internal
 */
export interface VdmServiceEntities {
  /**
   * @internal
   */
  entities: VdmEntity[];
  /**
   * @internal
   */
  complexTypes: VdmComplexType[];
  /**
   * @internal
   */
  enumTypes: VdmEnumType[];
  /**
   * @internal
   */
  functionImports: VdmOperation[];
  /**
   * @internal
   */
  actionImports?: VdmOperation[];
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
  /**
   * @internal
   */
  entitySetName: string;
  /**
   * @internal
   */
  entityTypeName: string;
  /**
   * @internal
   */
  className: string;
  /**
   * @internal
   */
  creatable: boolean;
  /**
   * @internal
   */
  updatable: boolean;
  /**
   * @internal
   */
  deletable: boolean;
  /**
   * @internal
   */
  keys: VdmProperty[];
  /**
   * @internal
   */
  properties: VdmProperty[];
  /**
   * @internal
   */
  navigationProperties: VdmNavigationProperty[];
  /**
   * @internal
   */
  description: string;
  /**
   * @internal
   */
  entityTypeNamespace: string;
  /**
   * @internal
   */
  functions: VdmOperation[];
  /**
   * @internal
   */
  actions: VdmOperation[];
}

/**
 * Subset of Entity required for generating bound actions and functions.
 * This is required because at the time of generating bound actions and functions the full list of entities is not yet available.
 * But the properties included here are needed for generating the functions and actions.
 * @internal
 */
export type VdmPartialEntity = Pick<
  VdmEntity,
  'entityTypeName' | 'entityTypeNamespace' | 'className'
>;

/**
 * Properties
 * @internal
 */
export interface VdmPropertyDescriptor {
  /**
   * @internal
   */
  originalName: string;
  /**
   * @internal
   */
  instancePropertyName: string;
  /**
   * @internal
   */
  propertyNameAsParam: string;
  /**
   * @internal
   */
  staticPropertyName: string;
  /**
   * @internal
   */
  isComplex?: boolean;
  /**
   * @internal
   */
  isEnum?: boolean;
  /**
   * @internal
   */
  isCollection: boolean;
}
/**
 * @internal
 */
export interface VdmPropertyValueConstraints {
  /**
   * @internal
   */
  maxLength?: string;
  /**
   * @internal
   */
  nullable: boolean;
}
/**
 * @internal
 */
export interface VdmProperty
  extends VdmPropertyDescriptor,
    VdmPropertyValueConstraints,
    VdmMappedEdmType {
  /**
   * @internal
   */
  description: string;
}

/**
 * Navigation Properties
 * @internal
 */
export interface VdmNavigationProperty extends VdmPropertyDescriptor {
  /**
   * @internal
   */
  from: string;
  /**
   * @internal
   */
  to: string;
  /**
   * @internal
   */
  toEntityClassName: string;
}
/**
 * @internal
 */
export interface VdmEnumMemberType {
  /**
   * @internal
   */
  name: string;
  /**
   * @internal
   */
  originalValue: string;
}
/**
 * @internal
 */
export interface VdmEnumType {
  /**
   * @internal
   */
  originalName: string;
  /**
   * @internal
   */
  typeName: string;
  /**
   * @internal
   */
  underlyingType: string;
  /**
   * @internal
   */
  members: VdmEnumMemberType[];
}

/**
 * Complex types and function imports
 * @internal
 */
export interface VdmComplexType {
  /**
   * @internal
   */
  originalName: string;
  /**
   * @internal
   */
  properties: VdmProperty[];
  /**
   * @internal
   */
  typeName: string;
  /**
   * @internal
   */
  fieldType: string;
  /**
   * @internal
   */
  namespace: string;
}
/**
 * @internal
 * Represents a partial operation (action or function).
 */
export interface VdmOperationBase {
  /**
   * @internal
   */
  originalName: string;
  /**
   * @internal
   */
  parameters: VdmParameter[];
  /**
   * @internal
   */
  parametersTypeName: string;
  /**
   * @internal
   */
  name: string;
  /**
   * @internal
   */
  description: string;
  /**
   * @internal
   */
  type: 'function' | 'action';
  /**
   * @internal
   */
  isBound: boolean;
  /**
   * @internal
   * only set for bound operations
   */
  entityClassName?: string;
}

/**
 * @internal
 * Represents either a function or an action.
 */
export interface VdmOperation extends VdmOperationBase {
  /**
   * @internal
   */
  httpMethod: string;
  /**
   * @internal
   */
  returnType: VdmOperationReturnType;
}

/**
 * @internal
 */
export interface VdmOperationReturnType {
  /**
   * @internal
   */
  builderFunction?: string;
  /**
   * @internal
   */
  returnType: string;
  /**
   * @internal
   */
  isCollection: boolean;
  /**
   * @internal
   */
  isNullable: boolean;
  /**
   * @internal
   */
  returnTypeCategory: VdmReturnTypeCategory;
  /**
   * @internal
   */
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
  /**
   * @internal
   */
  originalName: string;
  /**
   * @internal
   */
  parameterName: string;
  /**
   * @internal
   */
  nullable: boolean;
  /**
   * @internal
   */
  description: string;
}
/**
 * @internal
 */
export interface VdmMappedEdmType {
  /**
   * @internal
   */
  edmType: string;
  /**
   * @internal
   */
  jsType: string;
  /**
   * @internal
   */
  fieldType: string;
}
/**
 * @internal
 */
export interface ApiBusinessHubMetadata {
  /**
   * @internal
   */
  url: string;
  /**
   * @internal
   */
  communicationScenario: string | null;
  /**
   * @internal
   */
  businessDocumentationUrl?: string;
}
