/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed,
  EdmxParameter
} from '../common';

export interface EdmxNavigationProperty {
  Name: string;
  Type: string;
}

export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}

export type EdmxEntityType = EdmxEntityTypeBase<EdmxNavigationProperty> &
  EdmxDerivedType;

export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}

export interface EdmxEnumMember {
  Name: string;
  Value: string;
}

export interface EdmxEnumType extends EdmxNamed {
  Member: EdmxEnumMember[];
}

export interface EdmxFunctionImport extends EdmxNamed {
  EntitySet?: string;
  Function: string;
}

export interface EdmxFunction extends EdmxNamed {
  ReturnType: { Type: string };
  Parameter: EdmxParameter[];
  IsBound: boolean;
}

export interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}

export type EdmxComplexType = EdmxComplexTypeBase & EdmxDerivedType;
