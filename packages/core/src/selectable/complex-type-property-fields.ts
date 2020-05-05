/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityODataV4 } from '../entity';
import { ComplexTypeBigNumberPropertyField, ComplexTypeBigNumberPropertyFieldODataV4 } from './big-number-field';
import { ComplexTypeBinaryPropertyField, ComplexTypeBinaryPropertyFieldODataV4 } from './binary-field';
import { ComplexTypeBooleanPropertyField, ComplexTypeBooleanPropertyFieldODataV4 } from './boolean-field';
import { ComplexTypeDatePropertyField, ComplexTypeDatePropertyFieldODataV4 } from './date-field';
import { ComplexTypeNumberPropertyField, ComplexTypeNumberPropertyFieldODataV4 } from './number-field';
import { ComplexTypeStringPropertyField, ComplexTypeStringPropertyFieldODataV4 } from './string-field';
import { ComplexTypeTimePropertyField, ComplexTypeTimePropertyFieldODataV4 } from './time-field';

/**
 * @hidden
 */
export type ComplexTypePropertyFields<EntityT extends Entity> =
  | ComplexTypeBigNumberPropertyField<EntityT>
  | ComplexTypeBinaryPropertyField<EntityT>
  | ComplexTypeBooleanPropertyField<EntityT>
  | ComplexTypeDatePropertyField<EntityT>
  | ComplexTypeNumberPropertyField<EntityT>
  | ComplexTypeStringPropertyField<EntityT>
  | ComplexTypeTimePropertyField<EntityT>;

export type ComplexTypePropertyFieldsODataV4<EntityT extends EntityODataV4> =
  | ComplexTypeBigNumberPropertyFieldODataV4<EntityT>
  | ComplexTypeBinaryPropertyFieldODataV4<EntityT>
  | ComplexTypeBooleanPropertyFieldODataV4<EntityT>
  | ComplexTypeDatePropertyFieldODataV4<EntityT>
  | ComplexTypeNumberPropertyFieldODataV4<EntityT>
  | ComplexTypeStringPropertyFieldODataV4<EntityT>
  | ComplexTypeTimePropertyFieldODataV4<EntityT>;
