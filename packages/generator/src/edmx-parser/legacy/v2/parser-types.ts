import {
  EdmxMetadataBase,
  EdmxEntityTypeBase,
  EdmxFunctionImportBase,
  EdmxEntitySetBase,
  EdmxComplexTypeBase,
  EdmxParameter
} from '../common';

/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxMetadata extends EdmxMetadataBase {
  entitySets: EdmxEntitySet[];
  entityTypes: EdmxEntityType[];
  associationSets: EdmxAssociationSet[];
  associations: EdmxAssociation[];
  functionImports: EdmxFunctionImport[];
  complexTypes: EdmxComplexTypeBase[];
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function isV2Metadata(
  metadata: EdmxMetadataBase
): metadata is EdmxMetadata {
  return metadata.oDataVersion === 'v2';
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export type EdmxEntitySet = EdmxEntitySetBase;
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxEntityType extends EdmxEntityTypeBase {
  NavigationProperty: EdmxNavigationProperty[];
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxFunctionImport extends EdmxFunctionImportBase {
  ReturnType: string;
  'sap:action-for': string;
  Parameter: EdmxParameter[];
  'm:HttpMethod': string;
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxAssociation {
  Name: string;
  'sap:content-version': string;
  End: EdmxAssociationEnd[];
}

interface EdmxAssociationEnd {
  Type: string;
  Multiplicity: string;
  Role: string;
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export interface EdmxAssociationSet {
  Name: string;
  Association: string;
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  End: EdmxAssociationSetEnd[];
}

interface EdmxAssociationSetEnd {
  Role: string;
  EntitySet: string;
}

interface EdmxNavigationProperty {
  FromRole: string;
  Name: string;
  Relationship: string;
  ToRole: string;
}
