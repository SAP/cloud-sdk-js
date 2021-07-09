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
    ComplexT,
    NullableT,
    SelectableT
  >,
  EntityT extends Entity,
  ComplexT,
  NullableT extends boolean,
  SelectableT extends boolean
> = new (
  fieldName: string,
  fieldOf: ConstructorOrField<EntityT>,
  fieldOptions?: FieldOptions<NullableT, SelectableT>
) => ComplexTypeFieldT;

export type IsSelectableField<T> = T extends Constructable<any> ? true : false;
export type IsOrderableField<T> = T extends OrderableEdmType ? true : false;

type EntityTypeFromFieldOf<FieldOfT extends ConstructorOrField<any>> =
  FieldOfT extends ConstructorOrField<infer EntityT> ? EntityT : never;

export class FieldBuilder<FieldOfT extends ConstructorOrField<any>> {
  constructor(public fieldOf: FieldOfT) {}

  buildEdmTypeField<EdmT extends OrderableEdmType, NullableT extends boolean>(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): OrderableEdmTypeField<
    EntityTypeFromFieldOf<FieldOfT>,
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
  ): EdmTypeField<
    EntityTypeFromFieldOf<FieldOfT>,
    EdmT,
    NullableT,
    IsSelectableField<FieldOfT>
  >;
  buildEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ):
    | OrderableEdmTypeField<
        EntityTypeFromFieldOf<FieldOfT>,
        EdmT,
        NullableT,
        IsSelectableField<FieldOfT>
      >
    | EdmTypeField<
        EntityTypeFromFieldOf<FieldOfT>,
        EdmT,
        NullableT,
        IsSelectableField<FieldOfT>
      > {
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
      EntityTypeFromFieldOf<FieldOfT>,
      any,
      NullableT,
      IsSelectableField<FieldOfT>
    >,
    ComplexT,
    NullableT extends boolean
  >(
    fieldName: string,
    complexTypeFieldCtor: ComplexTypeFieldConstructor<
      ComplexTypeFieldT,
      EntityTypeFromFieldOf<FieldOfT>,
      ComplexT,
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
    EntityTypeFromFieldOf<FieldOfT>,
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
