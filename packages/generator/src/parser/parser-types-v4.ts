/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxMetadataBase,
  EdmxEntityTypeBase,
  EdmxEntitySetBase,
  EdmxFunctionImportBase,
  EdmxComplexType,
  EdmxNamed
} from './parser-types-common';

export interface EdmxMetadata extends EdmxMetadataBase {
  entitySets: EdmxEntitySet[];
  entityTypes: EdmxEntityType[];
  enumTypes: EdmxEnumType[];
  functionImports: EdmxFunctionImportBase[];
  complexTypes: EdmxComplexType[];
}

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

export interface EdmxEntityType extends EdmxEntityTypeBase {
  BaseType?: string;
  NavigationProperty: EdmxNavigationProperty[];
}

interface EdmxNavigationProperty {
  Name: string;
  Type: string;
}

export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: NavigationPropertyBinding[];
}

export interface NavigationPropertyBinding {
  Path: string;
  Target: string;
}
