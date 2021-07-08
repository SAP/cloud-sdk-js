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
import { OrderableEdmTypeField } from './orderable-edm-type-field';
import { CollectionField, CollectionFieldType } from './collection-field';
import { ConstructorOrField } from './constructor-or-field';

type ComplexTypeFieldConstructor<
  ComplexTypeFieldT extends ComplexTypeField<EntityT, any, NullableT>,
  EntityT extends Entity,
  NullableT extends boolean
> = new (
  fieldName: string,
  fieldOf: ConstructorOrField<EntityT>,
  isNullable: NullableT
) => ComplexTypeFieldT;

type EdmFieldSelectable<FieldOfT extends ConstructorOrField<any>> =
  FieldOfT extends ComplexTypeField<any> ? false : true;

export class FieldBuilder<
  EntityT extends Entity,
  FieldOfT extends ConstructorOrField<EntityT>
> {
  constructor(public fieldOf: FieldOfT) {}

  buildEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmTypeForEdmOrFieldType<EdmT>,
    isNullable: NullableT
  ): EdmTypeClassByType<
    EntityT,
    EdmT,
    NullableT,
    EdmFieldSelectable<FieldOfT>
  > {
    return (
      this.fieldOf instanceof ComplexTypeField
        ? this.buildComplexTypeEdmTypeField(fieldName, edmType, isNullable)
        : this.buildEntityEdmTypeField(fieldName, edmType, isNullable)
    ) as EdmTypeClassByType<
      EntityT,
      EdmT,
      NullableT,
      EdmFieldSelectable<FieldOfT>
    >;
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

  private buildEntityEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmTypeForEdmOrFieldType<EdmT>,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT, true> {
    if (isSortableEdmType(edmType)) {
      return new OrderableEdmTypeField(fieldName, this.fieldOf, edmType, {
        isNullable,
        isSelectable: true
      }) as EdmTypeClassByType<EntityT, EdmT, NullableT, true>;
    }
    return new EdmTypeField(fieldName, this.fieldOf, edmType, {
      isNullable,
      isSelectable: true
    }) as EdmTypeClassByType<EntityT, EdmT, NullableT, true>;
  }

  private buildComplexTypeEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmTypeForEdmOrFieldType<EdmT>,
    isNullable: NullableT
  ): EdmTypeClassByType<EntityT, EdmT, NullableT, false> {
    if (isSortableEdmType(edmType)) {
      return new OrderableEdmTypeField(fieldName, this.fieldOf, edmType, {
        isNullable,
        isSelectable: false
      }) as EdmTypeClassByType<EntityT, EdmT, NullableT, false>;
    }
    return new EdmTypeField(fieldName, this.fieldOf, edmType, {
      isNullable,
      isSelectable: false
    }) as EdmTypeClassByType<EntityT, EdmT, NullableT, false>;
  }
}

export type EdmTypeClassByType<
  EntityT extends Entity,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean,
  SelectableT extends boolean
> = EntityT extends Entity
  ? EdmT extends SortableEdmType
    ? OrderableEdmTypeField<EntityT, EdmT, NullableT, SelectableT>
    : EdmTypeField<EntityT, EdmT, NullableT, SelectableT>
  : EdmT extends SortableEdmType
  ? OrderableEdmTypeField<EntityT, EdmT, NullableT, SelectableT>
  : EdmTypeField<EntityT, EdmT, NullableT, SelectableT>;
