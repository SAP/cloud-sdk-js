import { ConstructorOrField as ConstructorOrFieldCommon, EntityBase } from '@sap-cloud-sdk/odata-common/internal';

/**
 * Union type to represent the parent of a field. This can either be an entity constructor or a complex type field.
 * @internal
 */
export type ConstructorOrField<EntityT extends EntityBase, ComplexT = any> = ConstructorOrFieldCommon<EntityT, ComplexT>;
