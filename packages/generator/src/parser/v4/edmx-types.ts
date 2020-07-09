/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxEntitySetBase,
  EdmxNamed,
  EdmxParameter
} from '../common/edmx-types';

export interface EdmxNavigationProperty {
  Name: string;
  Type: string;
}

export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}

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
