import { Entity } from '../entity';
import { ComplexTypeBigNumberPropertyField } from './big-number-field';
import { ComplexTypeBinaryPropertyField } from './binary-field';
import { ComplexTypeBooleanPropertyField } from './boolean-field';
import { ComplexTypeDatePropertyField } from './date-field';
import { ComplexTypeNumberPropertyField } from './number-field';
import { ComplexTypeStringPropertyField } from './string-field';
import { ComplexTypeTimePropertyField } from './time-field';

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
  | ComplexTypeTimePropertyField<EntityT, ComplexT>;
