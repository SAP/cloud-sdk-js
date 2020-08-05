/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EdmxEntityTypeBase, EdmxNamed, EdmxParameter } from '../common';

export interface EdmxNavigationProperty {
  FromRole: string;
  Name: string;
  Relationship: string;
  ToRole: string;
}

export interface EdmxAssociationEnd {
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

export interface EdmxAssociation {
  Name: string;
  'sap:content-version': string;
  End: EdmxAssociationEnd[];
}

export interface JoinedAssociationMetadata {
  Name: string;
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  Ends: End[];
}

export type EdmxEntityType = EdmxEntityTypeBase<EdmxNavigationProperty>;

export interface End {
  EntitySet: string;
  Type: string;
  Multiplicity: string;
  Role: string;
}

export interface EdmxFunctionImport extends EdmxNamed {
  EntitySet?: string;
  ReturnType?: string;
  'sap:action-for': string;
  Parameter: EdmxParameter[];
  'm:HttpMethod': string;
}
