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
 * Represents a v4 function import or action import.
 * This type does not represent the exact structure from EDMX, but merges action imports and function imports as follows:
 * Function imports have a property `Function`; action imports have a property `Action`.
 * Those are the names of the according operations.
 * To simplify parsing we split this information into `operationName` and `operationType`.
 * While the type representation does not include the `Function` nor `Action` properties, they still exist at runtime.
 */
export interface EdmxOperationImport extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  EntitySet?: string;
  /**
   * @internal
   */
  operationName: string;
  /**
   * @internal
   */
  operationType: 'function' | 'action';
}
/**
 * @internal
 * Represents a v4 function or action.
 * Each operation corresponds to one function import or action import in EDMX (@link EdmxOperationImport).
 */
export interface EdmxOperation extends EdmxNamed, EdmxNamespaced {
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
  IsBound: string;
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
