/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SwaggerEntity } from '../../swagger-parser/swagger-types';

export interface EdmxNamed {
  Name: string;
}

export interface EdmxProperty extends EdmxDocumented, EdmxNamed {
  MaxLength: string;
  Nullable: string;
  'sap:creatable': string;
  'sap:filterable': string;
  'sap:label': string;
  'sap:sortable': string;
  'sap:unicode': string;
  'sap:updatable': string;
  'sap:quickinfo'?: string;
  Type: string;
}

export interface EdmxDocumented {
  Documentation?: {
    Summary: string;
    LongDescription: string;
  };
}

export interface EdmxParameter extends EdmxDocumented, EdmxNamed {
  Type: string;
  Nullable: string;
}

export interface EdmxEntitySetBase extends EdmxNamed {
  EntityType: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}

export interface EdmxKey {
  PropertyRef: EdmxNamed[];
}

export interface EdmxEntityTypeBase<NavigationT> extends EdmxNamed {
  Key: EdmxKey;
  Property: EdmxProperty[];
  'sap:content-version': string;
  'sap:label'?: string;
  NavigationProperty: NavigationT[];
}

export interface EdmxComplexTypeBase extends EdmxNamed {
  Property: EdmxProperty[];
}

export interface JoinedEntityMetadata<
  EntitySetT extends EdmxEntitySetBase,
  EntityTypeT extends EdmxEntityTypeBase<any>
> {
  entitySet: EntitySetT;
  entityType: EntityTypeT;
  swaggerDefinition?: SwaggerEntity;
}
