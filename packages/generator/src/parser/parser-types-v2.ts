/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EdmxMetadataBase,
  EdmxEntityTypeBase,
  EdmxFunctionImportBase,
  EdmxEntitySetBase,
  EdmxComplexType
} from './parser-types-common';

export interface EdmxMetadata extends EdmxMetadataBase {
  entitySets: EdmxEntitySet[];
  entityTypes: EdmxEntityType[];
  associationSets: EdmxAssociationSet[];
  associations: EdmxAssociation[];
  functionImports: EdmxFunctionImport[];
  complexTypes: EdmxComplexType[];
}

export function isV2Metadata(
  metadata: EdmxMetadataBase
): metadata is EdmxMetadata {
  return metadata.oDataVersion === 'v2';
}

export type EdmxEntitySet = EdmxEntitySetBase;

export interface EdmxEntityType extends EdmxEntityTypeBase {
  NavigationProperty: EdmxNavigationProperty[];
}

export interface EdmxFunctionImport extends EdmxFunctionImportBase {
  'm:HttpMethod': string;
}

// Navigation Properties
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
