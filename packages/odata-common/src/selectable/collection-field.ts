import { Field } from './field';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import type { EntityBase } from '../entity-base';
import type { EdmTypeShared } from '../edm-types';
import type { DeSerializers } from '../de-serializers';
import type { FieldOptions } from './field';
import type { ConstructorOrField } from './constructor-or-field';
import type { ComplexTypeNamespace } from './complex-type-namespace';

/**
 * Represents a field of an entity or a complex type, that can have a collection as value.
 * @template EntityT - Type of the entity the field belongs to.
 * @template DeSerializersT - Type of the (de-)serializers.
 * @template CollectionFieldT - Type of of elements of the collection. This can either be an EDM type or complex type.
 * @template NullableT - Boolean type that represents whether the field is nullable.
 * @template SelectableT - Boolean type that represents whether the field is selectable.
 */
export class CollectionField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any> = any,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends Field<EntityT, NullableT, SelectableT> {
  readonly _deSerializers: DeSerializersT;
  /**
   * Creates an instance of CollectionField.
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param _fieldType - Edm type of the field according to the metadata description.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly _fieldType: CollectionFieldType<CollectionFieldT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, getEntityConstructor(_fieldOf), fieldOptions);
  }

  /**
   * Gets the path to the complex type property represented by this.
   * @returns The path to the complex type property.
   */
  fieldPath(): string {
    return this._fieldOf instanceof ComplexTypeField
      ? `${this._fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}

/**
 * Convenience type to reflect the type of the instances of a collection field.
 * The actual type of the elements for complex type collections is {@link ComplexTypeNamespace}.
 * @template CollectionFieldT - Type of of elements of the collection. This can either be an EDM type or complex type.
 */
export type CollectionFieldType<
  CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any>
> = CollectionFieldT | ComplexTypeNamespace<CollectionFieldT>;
