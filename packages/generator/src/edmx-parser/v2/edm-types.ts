import {
  EdmxEntityTypeBase,
  EdmxNamed,
  EdmxNamespaced,
  EdmxParameter
} from '../common';
/**
 * @internal
 */
export interface EdmxNavigationPropertyV2 extends EdmxNamed {
  /**
   * @internal
   */
  FromRole: string;
  /**
   * @internal
   */
  Relationship: string;
  /**
   * @internal
   */
  ToRole: string;
}
/**
 * @internal
 */
export interface EdmxAssociationEnd {
  /**
   * @internal
   */
  Type: string;
  /**
   * @internal
   */
  Multiplicity: string;
  /**
   * @internal
   */
  Role: string;
}
/**
 * @internal
 */
export interface EdmxAssociationSet extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  Association: string;
  /**
   * @internal
   */
  'sap:creatable': string;
  /**
   * @internal
   */
  'sap:updatable': string;
  /**
   * @internal
   */
  'sap:deletable': string;
  /**
   * @internal
   */
  'sap:content-version': string;
  /**
   * @internal
   */
  End: EdmxAssociationSetEnd[];
}

interface EdmxAssociationSetEnd {
  Role: string;
  EntitySet: string;
}
/**
 * @internal
 */
export interface EdmxAssociation extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  'sap:content-version': string;
  /**
   * @internal
   */
  End: EdmxAssociationEnd[];
}
/**
 * @internal
 */
export interface JoinedAssociationMetadata extends EdmxNamed {
  /**
   * @internal
   */
  'sap:creatable': string;
  /**
   * @internal
   */
  'sap:updatable': string;
  /**
   * @internal
   */
  'sap:deletable': string;
  /**
   * @internal
   */
  'sap:content-version': string;
  /**
   * @internal
   */
  Ends: End[];
}
/**
 * @internal
 */
export type EdmxEntityTypeV2 = EdmxEntityTypeBase<EdmxNavigationPropertyV2> &
  EdmxNamespaced;
/**
 * @internal
 */
export interface End {
  /**
   * @internal
   */
  EntitySet: string;
  /**
   * @internal
   */
  Type: string;
  /**
   * @internal
   */
  Multiplicity: string;
  /**
   * @internal
   */
  Role: string;
}
/**
 * @internal
 */
export interface EdmxFunctionImportV2 extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  EntitySet?: string;
  /**
   * @internal
   */
  ReturnType?: string;
  /**
   * @internal
   */
  'sap:action-for': string;
  /**
   * @internal
   */
  Parameter: EdmxParameter[];
  /**
   * @internal
   */
  'm:HttpMethod': string;
}
