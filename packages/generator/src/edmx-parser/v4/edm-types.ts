import {
  EdmxComplexTypeBase,
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed,
  EdmxNamespaced,
  EdmxParameter
} from '../common';
/**
 * @internal
 */
export interface EdmxNavigationPropertyV4 extends EdmxNamed {
  Type: string;
}
/**
 * @internal
 */
export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}
/**
 * @internal
 */
export type EdmxEntityTypeV4 = EdmxEntityTypeBase<EdmxNavigationPropertyV4> &
  EdmxDerivedType &
  EdmxNamespaced;
/**
 * @internal
 */
export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}
/**
 * @internal
 */
export interface EdmxEnumMember extends EdmxNamed {
  Value?: string;
}
/**
 * @internal
 */
export interface EdmxEnumType extends EdmxNamed, EdmxNamespaced {
  UnderlyingType?: string;
  Member: EdmxEnumMember[];
}
/**
 * @internal
 */
export interface EdmxFunctionImportV4 extends EdmxNamed, EdmxNamespaced {
  EntitySet?: string;
  Function: string;
}
/**
 * @internal
 */
export interface EdmxActionImport extends EdmxNamed, EdmxNamespaced {
  EntitySet?: string;
  Action: string;
}
/**
 * @internal
 */
export interface EdmxFunction extends EdmxNamed, EdmxNamespaced {
  ReturnType?: EdmxReturnType;
  Parameter: EdmxParameter[];
  IsBound: boolean;
}
/**
 * @internal
 */
export interface EdmxReturnType {
  Type: string;
  Nullable?: string;
}
/**
 * @internal
 */
export type EdmxAction = EdmxFunction;
/**
 * @internal
 */
export interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}
/**
 * @internal
 */
export type EdmxComplexType = EdmxComplexTypeBase & EdmxDerivedType;
