import {
  EdmxMetadataBase,
  EdmxEntityTypeBase,
  EdmxEntitySetBase,
  EdmxFunctionImportBase,
  EdmxComplexTypeBase,
  EdmxNamed,
  EdmxParameter
} from '../common';

/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxMetadata extends EdmxMetadataBase {
  entitySets: EdmxEntitySet[];
  entityTypes: EdmxEntityType[];
  enumTypes: EdmxEnumType[];
  functionImports: EdmxFunctionImport[];
  functions: EdmxFunction[];
  complexTypes: EdmxComplexType[];
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxComplexType extends EdmxComplexTypeBase, EdmxDerivedType {}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function isV4Metadata(
  metadata: EdmxMetadataBase
): metadata is EdmxMetadata {
  return metadata.oDataVersion === 'v4';
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEnumType extends EdmxNamed {
  Member: EdmxEnumMember[];
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEnumMember {
  Name: string;
  Value: string;
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEntityType extends EdmxEntityTypeBase, EdmxDerivedType {
  NavigationProperty: EdmxNavigationProperty[];
}

interface EdmxNavigationProperty {
  Name: string;
  Type: string;
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxFunction extends EdmxNamed {
  ReturnType: { Type: string };
  Parameter: EdmxParameter[];
  IsBound: boolean;
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxFunctionImport extends EdmxFunctionImportBase {
  Function: string;
}
