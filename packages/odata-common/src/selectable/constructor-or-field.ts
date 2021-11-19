import { DeSerializationMiddlewareBASE } from '../de-serializers/de-serialization-middleware';
import { Constructable, EntityBase } from '../entity-base';
import type { ComplexTypeField } from './complex-type-field';
import { NewComplexTypeField } from './complex-type-field-new';

/**
 * Union type to represent the parent of a field. This can either be an entity constructor or a complex type field.
 */
export type ConstructorOrField<EntityT extends EntityBase, ComplexT = any> =
  | Constructable<EntityT>
  | ComplexTypeField<EntityT, ComplexT, boolean, boolean>;

export type NewConstructorOrField<EntityT extends EntityBase, ComplexT = any> =
  | Constructable<EntityT>
  | NewComplexTypeField<
      EntityT,
      DeSerializationMiddlewareBASE,
      ComplexT,
      boolean,
      boolean
    >;
