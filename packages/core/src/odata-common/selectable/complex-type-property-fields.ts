import { Entity } from '../entity';
import { EdmTypeField } from './edm-type-field';
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
  | EdmTypeField<EntityT, any, boolean>
  | OrderableEdmField<EntityT, any, boolean>
  | ComplexTypeBigNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeBinaryPropertyField<EntityT, ComplexT>
  | ComplexTypeBooleanPropertyField<EntityT, ComplexT>
  | ComplexTypeDatePropertyField<EntityT, ComplexT>
  | ComplexTypeNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeStringPropertyField<EntityT, ComplexT>
  | ComplexTypeTimePropertyField<EntityT, ComplexT>;
