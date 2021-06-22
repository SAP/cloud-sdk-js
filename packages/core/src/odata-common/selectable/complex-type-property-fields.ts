import { Entity } from '../entity';
import { ComplexTypeBigNumberPropertyField } from './big-number-field';
import { ComplexTypeBinaryPropertyField } from './binary-field';
import { ComplexTypeBooleanPropertyField } from './boolean-field';
import { ComplexTypeDatePropertyField } from './date-field';
import { ComplexTypeNumberPropertyField } from './number-field';
import { ComplexTypeStringPropertyField } from './string-field';
import { ComplexTypeTimePropertyField } from './time-field';
import { ComplexTypeNullableBigNumberPropertyField } from './nullable-big-number-field';
import { ComplexTypeNullableBinaryPropertyField } from './nullable-binary-field';
import { ComplexTypeNullableBooleanPropertyField } from './nullable-boolean-field';
import { ComplexTypeNullableDatePropertyField } from './nullable-date-field';
import { ComplexTypeNullableNumberPropertyField } from './nullable-number-field';
import { ComplexTypeNullableStringPropertyField } from './nullable-string-field';
import { ComplexTypeNullableTimePropertyField } from './nullable-time-field';
/**
 * @hidden
 */
export type ComplexTypePropertyFields<EntityT extends Entity, ComplexT> =
  | ComplexTypeBigNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeBinaryPropertyField<EntityT, ComplexT>
  | ComplexTypeBooleanPropertyField<EntityT, ComplexT>
  | ComplexTypeDatePropertyField<EntityT, ComplexT>
  | ComplexTypeNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeStringPropertyField<EntityT, ComplexT>
  | ComplexTypeTimePropertyField<EntityT, ComplexT>
  | ComplexTypeNullableBigNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeNullableBinaryPropertyField<EntityT, ComplexT>
  | ComplexTypeNullableBooleanPropertyField<EntityT, ComplexT>
  | ComplexTypeNullableDatePropertyField<EntityT, ComplexT>
  | ComplexTypeNullableNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeNullableStringPropertyField<EntityT, ComplexT>
  | ComplexTypeNullableTimePropertyField<EntityT, ComplexT>;
