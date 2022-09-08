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
  /**
   * @internal
   */
  Type: string;
}
/**
 * @internal
 */
export interface EdmxNavigationPropertyBinding {
  /**
   * @internal
   */
  Path: string;
  /**
   * @internal
   */
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
  /**
   * @internal
   */
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}
/**
 * @internal
 */
export interface EdmxEnumMember extends EdmxNamed {
  /**
   * @internal
   */
  Value?: string;
}
/**
 * @internal
 */
export interface EdmxEnumType extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  UnderlyingType?: string;
  /**
   * @internal
   */
  Member: EdmxEnumMember[];
}
/**
 * @internal
 */
export interface EdmxFunctionImportV4 extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  EntitySet?: string;
  /**
   * @internal
   */
  Function: string;
}
/**
 * @internal
 */
export interface EdmxActionImport extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  EntitySet?: string;
  /**
   * @internal
   */
  Action: string;
}
/**
 * @internal
 */
export interface EdmxFunction extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  ReturnType?: EdmxReturnType;
  /**
   * @internal
   */
  Parameter: EdmxParameter[];
  /**
   * @internal
   */
  IsBound: boolean;
}
/**
 * @internal
 */
export interface EdmxReturnType {
  /**
   * @internal
   */
  Type: string;
  /**
   * @internal
   */
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
  /**
   * @internal
   */
  BaseType?: string;
}
/**
 * @internal
 */
export type EdmxComplexType = EdmxComplexTypeBase & EdmxDerivedType;
