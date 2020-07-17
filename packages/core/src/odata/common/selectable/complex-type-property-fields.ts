/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { ComplexTypeBigNumberPropertyField } from './big-number-field';
import { ComplexTypeBinaryPropertyField } from './binary-field';
import { ComplexTypeBooleanPropertyField } from './boolean-field';
import { ComplexTypeDatePropertyField } from './date-field';
import { ComplexTypeNumberPropertyField } from './number-field';
import { ComplexTypeStringPropertyField } from './string-field';
import { ComplexTypeTimePropertyField } from './time-field';
import { ComplexTypeNamespace } from './complex-type-namespace';

/**
 * @hidden
 */
export type ComplexTypePropertyFields<
  EntityT extends EntityBase,
  ComplexTypeNamespaceT extends ComplexTypeNamespace
> =
  | ComplexTypeBigNumberPropertyField<EntityT, ComplexTypeNamespaceT>
  | ComplexTypeBinaryPropertyField<EntityT, ComplexTypeNamespaceT>
  | ComplexTypeBooleanPropertyField<EntityT, ComplexTypeNamespaceT>
  | ComplexTypeDatePropertyField<EntityT, ComplexTypeNamespaceT>
  | ComplexTypeNumberPropertyField<EntityT, ComplexTypeNamespaceT>
  | ComplexTypeStringPropertyField<EntityT, ComplexTypeNamespaceT>
  | ComplexTypeTimePropertyField<EntityT, ComplexTypeNamespaceT>;
