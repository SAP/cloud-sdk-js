import { DeSerializers } from '../de-serializers';
import { Constructable, EntityBase } from '../entity-base';
import type { ComplexTypeField } from './complex-type-field';

/**
 * Union type to represent the parent of a field. This can either be an entity constructor or a complex type field.
 * @internal
 */
export type ConstructorOrField<EntityT extends EntityBase, ComplexT = any> =
  | Constructable<EntityT>
  | ComplexTypeField<EntityT, DeSerializers, ComplexT, boolean, boolean>;
