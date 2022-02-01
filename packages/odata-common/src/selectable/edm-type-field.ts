import { EntityBase, EntityIdentifiable } from '../entity-base';
import { Filter } from '../filter';
import { EdmTypeShared } from '../edm-types';
import { DeSerializers, DeserializedType } from '../de-serializers';
import { ComplexTypeField, getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';
import { Field, FieldOptions } from './field';

/**
 * Convenience type that maps the given [[FieldType]] to a new type that is either nullable or not, depending on the given `NullableT`.
 * @typeparam FieldT - Field type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 */
type NullableFieldType<
  FieldT,
  NullableT extends boolean
> = NullableT extends true ? FieldT | null : FieldT;

/**
 * Convenience type that maps the given EDM type to a [[FieldType]]. It also considers whether the field is nullable.
 * @typeparam EdmT - EDM type of the field. Deprecated: Field type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @internal
 */
export type FieldTypeByEdmType<
  T extends DeSerializers,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean
> = NullableFieldType<DeserializedType<T, EdmT>, NullableT>;

/**
 * Represents a property of an OData entity with an EDM type.
 *
 * `EdmTypeField`s are used as static properties of entities or EDM typed fields of complex type fields. They are generated from the OData metadata, i.e. for each property of
 * an OData entity, that has an EDM type, there is one static instance of `EdmTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `EdmTypeField`s are used to represent the domain of more or less primitive values that can be used in select, filter and order by functions.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `EdmTypeField<BusinessPartner, string>`
 * can be supplied as argument to the select function, e.g. `BusinessPartner.FIRST_NAME`.
 *
 * See also: [[Selectable]]
 * @typeparam EntityT - Type of the entity the field belongs to.
 * @typeparam DeSerializersT - Type of the (de-)serializers.
 * @typeparam EdmT - EDM type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @typeparam SelectableT - Boolean type that represents whether the field is selectable.
 */
export class EdmTypeField<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean = false,
    SelectableT extends boolean = false
  >
  extends Field<EntityT, NullableT, SelectableT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of EdmTypeField.
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - Constructor type of the entity the field belongs to.
   * @param edmType - Type of the field according to the metadata description.
   * @param _deSerializers - (De-)serializers used for transformation.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: ConstructorOrField<EntityT>,
    readonly edmType: EdmT,
    public _deSerializers: DeSerializersT, // Only necessary for the type, unused otherwise
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, getEntityConstructor(_fieldOf), fieldOptions);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'eq', i.e. `==`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  equals(
    value: FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  ): Filter<
    EntityT,
    DeSerializersT,
    FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  > {
    return new Filter(this.fieldPath(), 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(
    value: FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  ): Filter<
    EntityT,
    DeSerializersT,
    FieldTypeByEdmType<DeSerializersT, EdmT, NullableT>
  > {
    return new Filter(this.fieldPath(), 'ne', value, this.edmType);
  }

  /**
   * Path to the field to be used in filter and order by queries.
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this._fieldOf instanceof ComplexTypeField
      ? `${this._fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}
