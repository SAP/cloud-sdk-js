import {
  EdmxEntityTypeBase,
  EdmxNamed,
  EdmxNamespaced,
  EdmxParameter
} from '../common';

export interface EdmxNavigationProperty extends EdmxNamed {
  FromRole: string;
  Relationship: string;
  ToRole: string;
}

export interface EdmxAssociationEnd {
  Type: string;
  Multiplicity: string;
  Role: string;
}

export interface EdmxAssociationSet extends EdmxNamed, EdmxNamespaced {
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

export interface EdmxAssociation extends EdmxNamed, EdmxNamespaced {
  'sap:content-version': string;
  End: EdmxAssociationEnd[];
}

export interface JoinedAssociationMetadata extends EdmxNamed {
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  Ends: End[];
}

export type EdmxEntityType = EdmxEntityTypeBase<EdmxNavigationProperty> &
  EdmxNamespaced;

export interface End {
  EntitySet: string;
  Type: string;
  Multiplicity: string;
  Role: string;
}

export interface EdmxFunctionImport extends EdmxNamed, EdmxNamespaced {
  EntitySet?: string;
  ReturnType?: string;
  'sap:action-for': string;
  Parameter: EdmxParameter[];
  'm:HttpMethod': string;
}
