import { Entity } from '../entity';
import { EdmField } from './edm-field';
import {
  ComplexTypeBigNumberPropertyField,
  ComplexTypeBinaryPropertyField,
  ComplexTypeBooleanPropertyField,
  ComplexTypeDatePropertyField,
  ComplexTypeNumberPropertyField,
  ComplexTypeStringPropertyField,
  ComplexTypeTimePropertyField
} from './legacy';
import { OrderableEdmField } from './orderable-edm-field';

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
