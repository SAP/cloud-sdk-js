/* eslint-disable max-classes-per-file */

import { EdmTypeShared, OrderableEdmType } from '../edm-types';
import {
  Constructable,
  EntityBase,
  NewEntityIdentifiable
} from '../entity-base';
import { DeSerializationMiddlewareBASE } from '../de-serializers/de-serialization-middleware';
import { CollectionField, CollectionFieldType } from './collection-field';
import { FieldOptions } from './field';
import { EnumField } from './enum-field';
import { NewEdmTypeField } from './edm-type-field-new';
import { NewComplexTypeField } from './complex-type-field-new';
import { NewConstructorOrField } from './constructor-or-field';

type ComplexTypeFieldConstructor<
  ComplexTypeFieldT extends NewComplexTypeField<
    EntityT,
    T,
    ComplexT,
    NullableT,
    SelectableT
  >,
  EntityT extends EntityBase,
  T extends DeSerializationMiddlewareBASE,
  ComplexT,
  NullableT extends boolean,
  SelectableT extends boolean
> = new (
  fieldName: string,
  fieldOf: NewConstructorOrField<EntityT>,
  deSerializers: T,
  fieldOptions?: FieldOptions<NullableT, SelectableT>
) => ComplexTypeFieldT;

/**
 * Convenience type to determine whether a field should be selectable. If the given `FieldOfT` is the type of an entity, it is selectable.
 * @typeparam FieldOfT - Type of the entity or complex type field this field belongs to.
 * @internal
 */
export type IsSelectableField<FieldOfT extends NewConstructorOrField<any>> =
  FieldOfT extends Constructable<any> ? true : false;
/**
 * Convenience type to determine whether a field should be orderable. If the given `EdmT` is of type `OrderableEdmTypes`, it is orderable.
 * @typeparam EdmT - EDM type of the field.
 *  @internal
 */
export type IsOrderableField<EdmT extends EdmTypeShared<'any'>> =
  EdmT extends OrderableEdmType ? true : false;

type EntityTypeFromFieldOf<FieldOfT extends NewConstructorOrField<any>> =
  FieldOfT extends NewConstructorOrField<infer EntityT> ? EntityT : never;

/**
 * Field builder to orchestrate the creation of the different kinds of fields.
 * @typeparam FieldOfT - Type of the entity or complex type field this field belongs to.
 */
export class NewFieldBuilder<
  FieldOfT extends NewConstructorOrField<any>,
  T extends DeSerializationMiddlewareBASE
> implements NewEntityIdentifiable<FieldOfT, T>
{
  entity: FieldOfT;
  /**
   * Creates an instance of `FieldBuilder`.
   * @param fieldOf - Entity or complex type field, for which the field builder shall create fields.
   */
  constructor(public fieldOf: FieldOfT, public deSerializers: T) {}

  // buildEdmTypeField<EdmT extends OrderableEdmType, NullableT extends boolean>(
  //   fieldName: string,
  //   edmType: EdmT,
  //   isNullable: NullableT
  // ): OrderableEdmTypeField<
  //   EntityTypeFromFieldOf<FieldOfT>,
  //   EdmT,
  //   T,
  //   NullableT,
  //   true
  //   // IsSelectableField<FieldOfT>
  // >;
  // buildEdmTypeField<
  //   EdmT extends Exclude<EdmTypeShared<'any'>, OrderableEdmType>,
  //   NullableT extends boolean
  // >(
  //   fieldName: string,
  //   edmType: EdmT,
  //   isNullable: NullableT
  // ): NewEdmTypeField<
  //   EntityTypeFromFieldOf<FieldOfT>,
  //   EdmT,
  //   T,
  //   NullableT,
  //   true
  //   // IsSelectableField<FieldOfT>
  // >;
  /**
   * Build a field for a property with an EDM type.
   * For `[[OrderableEdmType]]` fields, the returned fields are of type `OrderableEdmTypeField`.
   * All other EDM types yield `EdmTypeField`s.
   * Fields of entities are selectable; fields of complex types are not selectable.
   * @param fieldName - Name of the field.
   * @param edmType - EDM type of the field.
   * @param isNullable - Whether the field is nullable.
   * @returns An EDM type field.
   */
  buildEdmTypeField<
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean
  >(
    fieldName: string,
    edmType: EdmT,
    isNullable: NullableT
  ): // | OrderableEdmTypeField<
  //     EntityTypeFromFieldOf<FieldOfT>,
  //     EdmT,
  //     T,
  //     NullableT,
  //     true
  //     // IsSelectableField<FieldOfT>
  //   >
  NewEdmTypeField<
    EntityTypeFromFieldOf<FieldOfT>,
    EdmT,
    T,
    NullableT,
    IsSelectableField<FieldOfT>
  > {
    const isSelectable = (this.fieldOf instanceof
      NewComplexTypeField) as IsSelectableField<FieldOfT>;

    // The type assertion is necessary because the signatures of the two constructors differ (TS design limitation)
    // const ctor = (
    //   isOrderableEdmType(edmType) ? OrderableEdmTypeField : EdmTypeField
    // ) as typeof EdmTypeField;
    const ctor = NewEdmTypeField;

    return new ctor(fieldName, this.fieldOf, edmType, {
      isNullable,
      isSelectable
    });
  }

  /**
   * Build a field for a property with a complex type.
   * Fields of entities are selectable; fields of complex types are not selectable.
   * @param fieldName - Name of the field.
   * @param complexTypeFieldCtor - Constructor of the complex type field.
   * @param isNullable - Whether the field is nullable.
   * @returns A complex type field of the given type.
   */
  buildComplexTypeField<
    ComplexTypeFieldT extends NewComplexTypeField<
      EntityTypeFromFieldOf<FieldOfT>,
      T,
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
      T,
      ComplexT,
      NullableT,
      IsSelectableField<FieldOfT>
    >,
    isNullable: NullableT
  ): ComplexTypeFieldT {
    const isSelectable = (this.fieldOf instanceof
      NewComplexTypeField) as IsSelectableField<FieldOfT>;
    return new complexTypeFieldCtor(
      fieldName,
      this.fieldOf as any,
      this.deSerializers,
      {
        isNullable,
        isSelectable
      }
    );
  }

  /**
   * Build a field for a property with a collection type.
   * The type of the field can either be an EDM type or a complex type.
   * Fields of entities are selectable; fields of complex types are not selectable.
   * @param fieldName - Name of the field.
   * @param collectionFieldType - Type of the collection. Can either be an EDM type or complex type (not complex type field).
   * @param isNullable - Whether the field is nullable.
   * @returns A collection field with the given collection type.
   */
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
    true // IsSelectableField<FieldOfT>
  > {
    const isSelectable = (this.fieldOf instanceof NewComplexTypeField) as true; // IsSelectableField<FieldOfT>;
    return new CollectionField(
      fieldName,
      this.fieldOf as any,
      collectionFieldType,
      {
        isNullable,
        isSelectable
      }
    );
  }

  /**
   * Build a field for a property with a enum type.
   * @param fieldName - Name of the field.
   * @param enumType - Enum type of this field.
   * @param isNullable - Whether the field is nullable.
   * @returns A collection field with the given collection type.
   */
  buildEnumField<EnumT extends string, NullableT extends boolean>(
    fieldName: string,
    enumType: Record<string, EnumT>,
    isNullable: NullableT
  ): EnumField<
    EntityTypeFromFieldOf<FieldOfT>,
    EnumT,
    NullableT,
    true // IsSelectableField<FieldOfT>
  > {
    const isSelectable = (this.fieldOf instanceof NewComplexTypeField) as true; // IsSelectableField<FieldOfT>;
    return new EnumField(fieldName, this.fieldOf as any, enumType, {
      isNullable,
      isSelectable
    });
  }
}
