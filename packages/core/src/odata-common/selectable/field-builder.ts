/* eslint-disable max-classes-per-file */

import { EdmTypeShared } from '../edm-types';
import { Entity } from '../entity';
import { ComplexTypeField } from './complex-type-field';
import {
  EdmTypeField,
  EdmTypeForEdmOrFieldType,
  isSortableEdmType,
  SortableEdmType
} from './edm-type-field';
import { OrderableEdmField } from './orderable-edm-field';
import { CollectionField, CollectionFieldType } from './collection-field';
import { AllFields } from './all-fields';
import { ConstructorOrField } from './constructor-or-field';
import {
  SelectableEdmField,
  SelectableOrderableEdmField
} from './selectable-edm-field';

type ComplexTypeFieldConstructor<
  ComplexTypeFieldT extends ComplexTypeField<EntityT, any, NullableT>,
  EntityT extends Entity,
  NullableT extends boolean
> = new (
  fieldName: string,
  fieldOf: ConstructorOrField<EntityT>,
  isNullable: NullableT
) => ComplexTypeFieldT;

export class FieldBuilder<EntityT extends Entity> {
  constructor(private fieldOf: ConstructorOrField<EntityT>) {}

  buildEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmTypeForEdmOrFieldType<EdmT>,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT> {
    if (this.fieldOf instanceof ComplexTypeField) {
      return this.buildComplexTypeEdmTypeField(fieldName, edmType, isNullable);
    }
    return this.buildEntityEdmTypeField(fieldName, edmType, isNullable);
  }

  buildComplexTypeField<
    ComplexTypeFieldT extends ComplexTypeField<any, any, any>,
    NullableT extends boolean
  >(
    fieldName: string,
    complexTypeFieldCtor: ComplexTypeFieldConstructor<
      ComplexTypeFieldT,
      EntityT,
      NullableT
    >,
    isNullable: NullableT
  ): ComplexTypeFieldT {
    return new complexTypeFieldCtor(fieldName, this.fieldOf, isNullable);
  }

  buildCollectionField<
    CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any>,
    NullableT extends boolean
  >(
    fieldName: string,
    collectionFieldType: CollectionFieldType<CollectionFieldT>,
    isNullable: NullableT
  ): CollectionField<EntityT, CollectionFieldT, NullableT> {
    return new CollectionField(
      fieldName,
      this.fieldOf,
      collectionFieldType,
      isNullable
    );
  }

  buildAllFieldsField(): AllFields<EntityT> {
    return new AllFields('*', this.fieldOf as any); // TODO
  }

  private buildEntityEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmTypeForEdmOrFieldType<EdmT>,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT> {
    if (isSortableEdmType(edmType)) {
      return new SelectableOrderableEdmField(
        fieldName,
        this.fieldOf,
        edmType,
        isNullable
      ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
    }
    return new SelectableEdmField(
      fieldName,
      this.fieldOf,
      edmType,
      isNullable
    ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
  }

  private buildComplexTypeEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmTypeForEdmOrFieldType<EdmT>,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT> {
    if (isSortableEdmType(edmType)) {
      return new OrderableEdmField(
        fieldName,
        this.fieldOf,
        edmType,
        isNullable
      ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
    }
    return new EdmTypeField(
      fieldName,
      this.fieldOf,
      edmType,
      isNullable
    ) as EdmTypeClassByType<EntityT, EdmT, NullableT>;
  }
}

export type EdmTypeClassByType<
  EntityT extends Entity,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean
> = EntityT extends Entity
  ? EdmT extends SortableEdmType
    ? SelectableOrderableEdmField<EntityT, EdmT, NullableT>
    : SelectableEdmField<EntityT, EdmT, NullableT>
  : EdmT extends SortableEdmType
  ? OrderableEdmField<EntityT, EdmT, NullableT>
  : EdmTypeField<EntityT, EdmT, NullableT>;
