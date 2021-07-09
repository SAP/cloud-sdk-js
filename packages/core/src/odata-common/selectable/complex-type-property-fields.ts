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
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @hidden
 */
export type ComplexTypePropertyFields<EntityT extends Entity, ComplexT> =
  | EdmTypeField<EntityT, any, boolean, false>
  | OrderableEdmTypeField<EntityT, any, boolean, false>
  | ComplexTypeBigNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeBinaryPropertyField<EntityT, ComplexT>
  | ComplexTypeBooleanPropertyField<EntityT, ComplexT>
  | ComplexTypeDatePropertyField<EntityT, ComplexT>
  | ComplexTypeNumberPropertyField<EntityT, ComplexT>
  | ComplexTypeStringPropertyField<EntityT, ComplexT>
  | ComplexTypeTimePropertyField<EntityT, ComplexT>;
