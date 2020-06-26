/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxMetadataBase,
  EdmxEntityTypeBase,
  EdmxEntitySetBase,
  EdmxFunctionImportBase,
  EdmxComplexTypeBase,
  EdmxNamed,
  EdmxParameter
} from '../common';

export interface EdmxMetadata extends EdmxMetadataBase {
  entitySets: EdmxEntitySet[];
  entityTypes: EdmxEntityType[];
  enumTypes: EdmxEnumType[];
  functionImports: EdmxFunctionImport[];
  functions: EdmxFunction[];
  complexTypes: EdmxComplexType[];
}

export interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}

export interface EdmxComplexType extends EdmxComplexTypeBase, EdmxDerivedType {}

export function isV4Metadata(
  metadata: EdmxMetadataBase
): metadata is EdmxMetadata {
  return metadata.oDataVersion === 'v4';
}

export interface EdmxEnumType extends EdmxNamed {
  Member: EdmxEnumMember[];
}

export interface EdmxEnumMember {
  Name: string;
  Value: string;
}

export interface EdmxEntityType extends EdmxEntityTypeBase, EdmxDerivedType {
  NavigationProperty: EdmxNavigationProperty[];
}

interface EdmxNavigationProperty {
  Name: string;
  Type: string;
}

export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}

export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}

export interface EdmxFunction extends EdmxNamed {
  ReturnType: { Type: string };
  Parameter: EdmxParameter[];
  IsBound: boolean;
}

export interface EdmxFunctionImport extends EdmxFunctionImportBase {
  Function: string;
}
