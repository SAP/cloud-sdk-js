import { Entity } from '../entity';
import { ComplexTypeBigNumberPropertyField } from './legacy/big-number-field';
import { ComplexTypeBinaryPropertyField } from './binary-field';
import { ComplexTypeBooleanPropertyField } from './boolean-field';
import { ComplexTypeDatePropertyField } from './legacy/date-field';
import { EdmField } from './edm-field';
import { OrderableEdmField } from './orderable-edm-field';
import { ComplexTypeNumberPropertyField } from './legacy/number-field';
import { ComplexTypeStringPropertyField } from './legacy/string-field';
import { ComplexTypeTimePropertyField } from './time-field';

/**
 * @hidden
 */
export type ComplexTypePropertyFields<EntityT extends Entity, ComplexT> =
  | EdmField<EntityT, any, boolean>
  | OrderableEdmField<EntityT, any, boolean>
  | ComplexTypeBigNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeBinaryPropertyField<EntityT, ComplexT>
  | ComplexTypeBooleanPropertyField<EntityT, ComplexT>
  | ComplexTypeDatePropertyField<EntityT, ComplexT>
  | ComplexTypeNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeStringPropertyField<EntityT, ComplexT>
  | ComplexTypeTimePropertyField<EntityT, ComplexT>;
