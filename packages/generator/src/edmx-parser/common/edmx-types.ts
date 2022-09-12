import { SwaggerEntity } from '../../swagger-parser';
/**
 * @internal
 */
export interface EdmxNamed {
  /**
   * @internal
   */
  Name: string;
}
/**
 * @internal
 */
export interface EdmxNamespaced {
  /**
   * @internal
   */
  Namespace: string;
}
/**
 * @internal
 */
export interface EdmxProperty extends EdmxDocumented, EdmxNamed {
  /**
   * @internal
   */
  MaxLength: string;
  /**
   * @internal
   */
  Nullable: string;
  /**
   * @internal
   */
  'sap:creatable': string;
  /**
   * @internal
   */
  'sap:filterable': string;
  /**
   * @internal
   */
  'sap:label': string;
  /**
   * @internal
   */
  'sap:sortable': string;
  /**
   * @internal
   */
  'sap:unicode': string;
  /**
   * @internal
   */
  'sap:updatable': string;
  /**
   * @internal
   */
  'sap:quickinfo'?: string;
  /**
   * @internal
   */
  Type: string;
}
/**
 * @internal
 */
export interface EdmxDocumented {
  /**
   * @internal
   */
  Documentation?: {
    /**
     * @internal
     */
    Summary: string;
    /**
     * @internal
     */
    LongDescription: string;
  };
}
/**
 * @internal
 */
export interface EdmxParameter extends EdmxDocumented, EdmxNamed {
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
export interface EdmxEntitySetBase extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  EntityType: string;
  /**
   * @internal
   */
  'sap:content-version': string;
  /**
   * @internal
   */
  'sap:creatable': string;
  /**
   * @internal
   */
  'sap:deletable': string;
  /**
   * @internal
   */
  'sap:pageable': string;
  /**
   * @internal
   */
  'sap:updatable': string;
}
/**
 * @internal
 */
export interface EdmxKey {
  /**
   * @internal
   */
  PropertyRef: EdmxNamed[];
}
/**
 * @internal
 */
export interface EdmxEntityTypeBase<NavigationT>
  extends EdmxNamed,
    EdmxNamespaced {
  /**
   * @internal
   */
  Key: EdmxKey;
  /**
   * @internal
   */
  Property: EdmxProperty[];
  /**
   * @internal
   */
  'sap:content-version': string;
  /**
   * @internal
   */
  'sap:label'?: string;
  /**
   * @internal
   */
  NavigationProperty: NavigationT[];
}
/**
 * @internal
 */
export interface EdmxComplexTypeBase extends EdmxNamed, EdmxNamespaced {
  /**
   * @internal
   */
  Property: EdmxProperty[];
}
/**
 * @internal
 */
export interface JoinedEntityMetadata<
  EntitySetT extends EdmxEntitySetBase,
  EntityTypeT extends EdmxEntityTypeBase<any>
> {
  /**
   * @internal
   */
  entitySet: EntitySetT;
  /**
   * @internal
   */
  entityType: EntityTypeT;
  /**
   * @internal
   */
  swaggerDefinition?: SwaggerEntity;
}
