import { ODataVersion } from '@sap-cloud-sdk/util';
import { EdmTypeShared, isEdmType } from '../edm-types';
import { Constructable, EntityBase } from '../entity-base';
import { Field, FieldOptions } from './field';
import {
  isComplexTypeNameSpace,
  ComplexTypeNamespace
} from './complex-type-namespace';
import type { ConstructorOrField } from './constructor-or-field';

/**
 * Represents a complex type property of an entity or a complex type.
 *
 * `ComplexTypeField`s are used as static properties of entities and are generated from the metadata, i.e. for each property of
 * an OData entity, that has a complex type, there exists one static instance of `ComplexTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `ComplexTypeField`s are used to represent the domain of complex or custom structures that can be used in select, filter and order by functions.
 * For example, when constructing a query on the TimeSheetEntry entity, an instance of `ComplexTypeField<TimeSheetEntry>`
 * can be supplied as argument to the select function, e.g. `TimeSheetEntry.TIME_SHEET_DATA_FIELDS`.
 * Moreover, classes implementing this abstract class will provide property fields, that can be used for filtering and ordering.
 *
 * See also: [[Selectable]]
 * @typeparam EntityT - Type of the entity the field belongs to.
 * @typeparam ComplexT - Type of complex type represented by this field.
 * @typeparam NullableT - Boolean type that represents whether the field is nullable.
 * @typeparam SelectableT - Boolean type that represents whether the field is selectable.
 * @internal
 */
export abstract class ComplexTypeField<
  EntityT extends EntityBase,
  ComplexT = any,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends Field<EntityT, NullableT, SelectableT> {
  /**
   * @internal
   * Note that this property is crucial, although not really used.
   * If it is removed this class becomes structural equivalent to e.g. ComplexTypeStringPropertyField which leads to unexpected behavior on the `selectable` list of objects.
   */
  readonly complexTypeName?: string;

  /**
   * The complex type of the complex type property represented by this.
   */
  readonly _complexType: ComplexTypeNamespace<ComplexT>;

  /**
   * Creates an instance of ComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   * @param complexType - The complex type of the complex type property represented by this.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, ComplexT>,
    complexType: ComplexTypeNamespace<ComplexT>,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );

  /**
   * Creates an instance of ComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   * @param complexTypeOrName - The complex type of the complex type property represented by this or the name of the type of the field according to the metadata description. Using the name here is deprecated.
   * @param fieldOptions - Optional settings for this field.
   */
  constructor(
    fieldName: string,
    readonly fieldOf: ConstructorOrField<EntityT, ComplexT>,
    complexTypeOrName?: ComplexTypeNamespace<ComplexT> | string,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, getEntityConstructor(fieldOf), fieldOptions);
    if (typeof complexTypeOrName === 'string') {
      this.complexTypeName = complexTypeOrName;
    } else if (isComplexTypeNameSpace(complexTypeOrName)) {
      this._complexType = complexTypeOrName;
    }
  }

  /**
   * Gets the path to the complex type property represented by this.
   * @returns The path to the complex type property.
   */
  fieldPath(): string {
    return this.fieldOf instanceof ComplexTypeField
      ? `${this.fieldOf.fieldPath()}/${this._fieldName}`
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
  fieldOf: ConstructorOrField<EntityT, ComplexT>
): Constructable<EntityT> {
  return fieldOf instanceof ComplexTypeField
    ? fieldOf._entityConstructor
    : fieldOf;
}

/**
 * Convenience method to get the [[EdmTypeShared]] from the overloaded constructor.
 * The two scenarios are:
 * - `complexTypeNameOrEdmType` is of type `EdmTypeShared` and `edmTypeOrUndefined` is `undefined`
 * - `complexTypeNameOrEdmType` is of type `string` and `edmTypeOrUndefined` is of type `EdmTypeShared`
 * @param complexTypeNameOrEdmType - Either the name of the complex type or the EDM type.
 * @param edmTypeOrUndefined - Either the EDM type or `undefined`.
 * @returns The EDM type resolved for the two arguments.
 * @internal
 */
export function getEdmType<VersionT extends ODataVersion | 'any'>(
  complexTypeNameOrEdmType: string | EdmTypeShared<VersionT>,
  edmTypeOrUndefined?: EdmTypeShared<VersionT>
): EdmTypeShared<VersionT> {
  if (edmTypeOrUndefined) {
    if (
      typeof complexTypeNameOrEdmType === 'string' &&
      !isEdmType(complexTypeNameOrEdmType) &&
      isEdmType(edmTypeOrUndefined)
    ) {
      return edmTypeOrUndefined;
    }
  } else if (isEdmType(complexTypeNameOrEdmType)) {
    return complexTypeNameOrEdmType;
  }
  throw new Error(
    `Failed to get EDM type based on '${complexTypeNameOrEdmType}' and '${edmTypeOrUndefined}'.`
  );
}
