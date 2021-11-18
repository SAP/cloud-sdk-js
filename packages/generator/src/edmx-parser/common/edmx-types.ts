import { SwaggerEntity } from '../../swagger-parser/swagger-types';
/**
 * @internal
 */
export interface EdmxNamed {
  Name: string;
}
/**
 * @internal
 */
export interface EdmxNamespaced {
  Namespace: string;
}
/**
 * @internal
 */
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
/**
 * @internal
 */
export interface EdmxDocumented {
  Documentation?: {
    Summary: string;
    LongDescription: string;
  };
}
/**
 * @internal
 */
export interface EdmxParameter extends EdmxDocumented, EdmxNamed {
  Type: string;
  Nullable?: string;
}
/**
 * @internal
 */
export interface EdmxEntitySetBase extends EdmxNamed, EdmxNamespaced {
  EntityType: string;
  'sap:content-version': string;
  'sap:creatable': string;
  'sap:deletable': string;
  'sap:pageable': string;
  'sap:updatable': string;
}
/**
 * @internal
 */
export interface EdmxKey {
  PropertyRef: EdmxNamed[];
}
/**
 * @internal
 */
export interface EdmxEntityTypeBase<NavigationT>
  extends EdmxNamed,
    EdmxNamespaced {
  Key: EdmxKey;
  Property: EdmxProperty[];
  'sap:content-version': string;
  'sap:label'?: string;
  NavigationProperty: NavigationT[];
}
/**
 * @internal
 */
export interface EdmxComplexTypeBase extends EdmxNamed, EdmxNamespaced {
  Property: EdmxProperty[];
}
/**
 * @internal
 */
export interface JoinedEntityMetadata<
  EntitySetT extends EdmxEntitySetBase,
  EntityTypeT extends EdmxEntityTypeBase<any>
> {
  entitySet: EntitySetT;
  entityType: EntityTypeT;
  swaggerDefinition?: SwaggerEntity;
}
