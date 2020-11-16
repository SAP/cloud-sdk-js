import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed, EdmxNamespaced,
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
  EdmxDerivedType;

export type EdmxEntityTypeNamespaced = EdmxEntityType & EdmxNamespaced;

export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}

export type EdmxEntitySetNamespaced = EdmxEntitySet & EdmxNamespaced;

export interface EdmxEnumMember extends EdmxNamed {
  Value: string;
}

export interface EdmxEnumType extends EdmxNamed {
  Member: EdmxEnumMember[];
}

export type EdmxEnumTypeNamespaced = EdmxEnumType & EdmxNamespaced;

export interface EdmxFunctionImport extends EdmxNamed {
  EntitySet?: string;
  Function: string;
}

export type EdmxFunctionImportNamespaced = EdmxFunctionImport & EdmxNamespaced;

export interface EdmxActionImport extends EdmxNamed {
  EntitySet?: string;
  Action: string;
}

export type EdmxActionImportNamespaced = EdmxActionImport & EdmxNamespaced;

export interface EdmxFunction extends EdmxNamed {
  ReturnType?: { Type: string };
  Parameter: EdmxParameter[];
  IsBound: boolean;
}

export type EdmxFunctionNamespaced = EdmxFunction & EdmxNamespaced;

export type EdmxAction = EdmxFunction;

export type EdmxActionNamespaced = EdmxFunctionNamespaced;

export interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}

export type EdmxComplexType = EdmxComplexTypeBase & EdmxDerivedType;

export type EdmxComplexTypeNamespaced = EdmxComplexType & EdmxNamespaced;
