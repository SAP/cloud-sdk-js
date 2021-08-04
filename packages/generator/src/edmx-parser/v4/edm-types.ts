import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed,
  EdmxNamespaced,
  EdmxParameter
} from '../common';

export interface EdmxNavigationProperty extends EdmxNamed {
  Type: string;
}

export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}

export type EdmxEntityType = EdmxEntityTypeBase<EdmxNavigationProperty> &
  EdmxDerivedType &
  EdmxNamespaced;

export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}

export interface EdmxEnumMember extends EdmxNamed {
  Value?: string;
}

export interface EdmxEnumType extends EdmxNamed, EdmxNamespaced {
  UnderlyingType?: string;
  Member: EdmxEnumMember[];
}

export interface EdmxFunctionImport extends EdmxNamed, EdmxNamespaced {
  EntitySet?: string;
  Function: string;
}

export interface EdmxActionImport extends EdmxNamed, EdmxNamespaced {
  EntitySet?: string;
  Action: string;
}

export interface EdmxFunction extends EdmxNamed, EdmxNamespaced {
  ReturnType?: EdmxReturnType;
  Parameter: EdmxParameter[];
  IsBound: boolean;
}

export interface EdmxReturnType {
  Type: string;
  Nullable?: string;
}

export type EdmxAction = EdmxFunction;

export interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}

export type EdmxComplexType = EdmxComplexTypeBase & EdmxDerivedType;
