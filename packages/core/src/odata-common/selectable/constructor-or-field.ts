import { Constructable, Entity } from '../entity';
import type { ComplexTypeField } from './complex-type-field';

/**
 * Union type to represent the parent of a field. This can either be an entity constructor or a complex type field.
 */
export type ConstructorOrField<EntityT extends Entity, ComplexT = any> =
  | Constructable<EntityT>
  | ComplexTypeField<EntityT, ComplexT, boolean, boolean>;
