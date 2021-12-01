import {
  Constructable,
  EntityBase,
  NewEntityIdentifiable
} from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import {
  DeSerializers,
  DeserializedType
} from '../de-serializers/de-serializers';
import { NewFilter } from '../filter/filter-new';
import { FieldOptions } from './field';
import { NewField } from './field-new';
import { NewConstructorOrField } from './constructor-or-field';
import { NewComplexTypeField } from './complex-type-field-new';

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
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam EdmT - EDM type of the field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @typeparam SelectableT - Boolean type that represents whether the field is selectable.
 */
export class NewEdmTypeField<
    EntityT extends EntityBase,
    // FieldOfT extends ConstructorOrField<any>,
    EdmT extends EdmTypeShared<'any'>,
    T extends DeSerializers,
    NullableT extends boolean = false,
    SelectableT extends boolean = false
  >
  extends NewField<EntityT, NullableT, SelectableT>
  implements NewEntityIdentifiable<Constructable<EntityT>, T>
{
  entity: Constructable<EntityT>;
  deSerializers: T;
  /**
   * Creates an instance of EdmTypeField.
   * @param fieldName - Actual name of the field used in the OData request.
   * @param _fieldOf - Constructor type of the entity the field belongs to.
   * @param edmType - Type of the field according to the metadata description.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly _fieldOf: NewConstructorOrField<EntityT>, // ConstructableBASE<EntityT, T>,
    readonly edmType: EdmT,
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
    value: FieldTypeByEdmType<T, EdmT, NullableT>
  ): NewFilter<EntityT, T, FieldTypeByEdmType<T, EdmT, NullableT>> {
    return new NewFilter(
      // getEntityConstructor(this._fieldOf),
      this.deSerializers,
      this.fieldPath(),
      'eq',
      value // this.edmType)
    );
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  // notEquals(
  //   value: FieldTypeByEdmType<T, EdmT, NullableT>
  // ): NewFilter<FieldOfT, T, FieldTypeByEdmType<T, EdmT, NullableT>> {
  //   return new NewFilter(this.fieldPath(), 'ne', value, this.edmType);
  // }

  /**
   * Path to the field to be used in filter and order by queries.
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this._fieldOf instanceof NewComplexTypeField
      ? `${this._fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}

/**
 * Convenience method to get the entity constructor of the parent of a complex type.
 * @param fieldOf - Either an entity constructor or another complex type field.
 * @returns The constructor of the transitive parent entity;
 * @internal
 */
export function getEntityConstructor<EntityT extends EntityBase, ComplexT>(
  fieldOf: NewConstructorOrField<EntityT, ComplexT>
): Constructable<EntityT> {
  return fieldOf instanceof NewComplexTypeField
    ? fieldOf._entityConstructor
    : fieldOf;
}
