/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Constructable, EntityBase } from '../entity';
import { ComplexTypeField } from './complex-type-field';

/**
 * Union type to represent the parent of a field. This can either be an entity constructor or a complex type field.
 */
export type ConstructorOrField<EntityT extends EntityBase, ComplexT = any> =
  | Constructable<EntityT>
  | ComplexTypeField<EntityT, ComplexT>;
