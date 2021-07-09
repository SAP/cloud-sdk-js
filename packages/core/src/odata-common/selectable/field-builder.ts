/* eslint-disable max-classes-per-file */

import {
  EdmTypeShared,
  isOrderableEdmType,
  OrderableEdmType
} from '../edm-types';
import { Constructable, Entity } from '../entity';
import { ComplexTypeField } from './complex-type-field';
import { EdmTypeField, EdmTypeForEdmOrFieldType } from './edm-type-field';
import { OrderableEdmTypeField } from './orderable-edm-type-field';
import { CollectionField, CollectionFieldType } from './collection-field';
import { ConstructorOrField } from './constructor-or-field';
import { FieldOptions } from './field';

type ComplexTypeFieldConstructor<
  ComplexTypeFieldT extends ComplexTypeField<
    EntityT,
    any,
    NullableT,
    SelectableT
  >,
  EntityT extends Entity,
  NullableT extends boolean,
  SelectableT extends boolean
> = new (
  fieldName: string,
  fieldOf: ConstructorOrField<EntityT>,
  fieldOptions?: FieldOptions<NullableT, SelectableT>
) => ComplexTypeFieldT;

export type IsSelectableField<T> = T extends Constructable<any> ? true : false;
export type IsOrderableField<T> = T extends OrderableEdmType ? true : false;

export class FieldBuilder<
  EntityT extends Entity,
  FieldOfT extends ConstructorOrField<EntityT>
> {
  constructor(public fieldOf: FieldOfT) {}

  buildEdmTypeField<EdmT extends OrderableEdmType, NullableT extends boolean>(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): OrderableEdmTypeField<
    EntityT,
    EdmT,
    NullableT,
    IsSelectableField<FieldOfT>
  >;
  buildEdmTypeField<
    EdmT extends Exclude<EdmTypeShared<'any'>, OrderableEdmType>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): EdmTypeField<EntityT, EdmT, NullableT, IsSelectableField<FieldOfT>>;
  buildEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ):
    | OrderableEdmTypeField<
        EntityT,
        EdmT,
        NullableT,
        IsSelectableField<FieldOfT>
      >
    | EdmTypeField<EntityT, EdmT, NullableT, IsSelectableField<FieldOfT>> {
    const isSelectable = (this.fieldOf instanceof
      ComplexTypeField) as IsSelectableField<FieldOfT>;

    // The type assertion is necessary because the signatures of the two constructors differ (TS design limitation)
    const ctor = (
      isOrderableEdmType(edmType) ? OrderableEdmTypeField : EdmTypeField
    ) as typeof EdmTypeField;

    return new ctor(
      fieldName,
      this.fieldOf,
      edmType as EdmTypeForEdmOrFieldType<EdmT>,
      {
        isNullable,
        isSelectable
      }
    );
  }

  buildComplexTypeField<
    ComplexTypeFieldT extends ComplexTypeField<
      any,
      any,
      any,
      IsSelectableField<FieldOfT>
    >,
    NullableT extends boolean
  >(
    fieldName: string,
    complexTypeFieldCtor: ComplexTypeFieldConstructor<
      ComplexTypeFieldT,
      EntityT,
      NullableT,
      IsSelectableField<FieldOfT>
    >,
    isNullable: NullableT
  ): ComplexTypeFieldT {
    const isSelectable = (this.fieldOf instanceof
      ComplexTypeField) as IsSelectableField<FieldOfT>;
    return new complexTypeFieldCtor(fieldName, this.fieldOf, {
      isNullable,
      isSelectable
    });
  }

  buildCollectionField<
    CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any>,
    NullableT extends boolean
  >(
    fieldName: string,
    collectionFieldType: CollectionFieldType<CollectionFieldT>,
    isNullable: NullableT
  ): CollectionField<
    EntityT,
    CollectionFieldT,
    NullableT,
    IsSelectableField<FieldOfT>
  > {
    const isSelectable = (this.fieldOf instanceof
      ComplexTypeField) as IsSelectableField<FieldOfT>;
    return new CollectionField(fieldName, this.fieldOf, collectionFieldType, {
      isNullable,
      isSelectable
    });
  }
}
