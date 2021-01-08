import { ODataVersion } from '@sap-cloud-sdk/util';
import { EdmTypeShared, isEdmType } from '../edm-types';
import { Constructable, Entity } from '../entity';
import { Field } from './field';
import {
  isComplexTypeNameSpace,
  ComplexTypeNamespace
} from './complex-type-namespace';
import type { ConstructorOrField } from './constructor-or-field';

/**
 * Represents a complex type property of an entity.
 *
 * `ComplexTypeField`s are used as static properties of entities and are generated from the metadata, i.e. for each property of
 * an OData entity, that has a complex type, there exists one static instance of `ComplexTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `ComplexTypeField`s are used to represent the domain of complex or custom structures that can be used in select, filter and order by functions.
 * For example, when constructing a query on the TimeSheetEntry entity, an instance of `ComplexTypeField<TimeSheetEntry>`
 * can be supplied as argument to the select function, e.g. `TimeSheetEntry.TIME_SHEET_DATA_FIELDS`.
 * Moreover, classes implementing this abstract class will provide property fields, that can be used for filtering and ordering.
 *
 * See also: [[Selectable]]
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export abstract class ComplexTypeField<
  EntityT extends Entity,
  ComplexT = any
> extends Field<EntityT> {
  /**
   * @hidden
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
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   * @param complexType - The complex type of the complex type property represented by this.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, ComplexT>,
    complexType?: ComplexTypeNamespace<ComplexT>
  );

  /**
   * @deprecated Since v1.19.0.
   *
   * Creates an instance of ComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param entityConstructor - Constructor type of the entity the field belongs to.
   * @param complexTypeName - Name of the type of the field according to the metadata description.
   */
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    complexTypeName: string
  );

  /**
   * Creates an instance of ComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   * @param complexTypeOrName - The complex type of the complex type property represented by this or the name of the type of the field according to the metadata description. Using the name here is deprecated.
   */
  constructor(
    fieldName: string,
    readonly fieldOf: ConstructorOrField<EntityT, ComplexT>,
    complexTypeOrName?: ComplexTypeNamespace<ComplexT> | string
  ) {
    super(fieldName, getEntityConstructor(fieldOf));
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
 *
 * @param fieldOf - Either an entity constructor or another complex type field.
 * @returns The constructor of the transitive parent entity;
 */
export function getEntityConstructor<EntityT extends Entity, ComplexT>(
  fieldOf: ConstructorOrField<EntityT, ComplexT>
): Constructable<EntityT> {
  return fieldOf instanceof ComplexTypeField
    ? fieldOf._entityConstructor
    : fieldOf;
}

/**
 * Convenience method to get the [[EdmTypeShared]] from the overloaded constructor.
 * The two scenarios are complexTypeNameOrEdmType = EdmTypeShared and edmTypeOrUndefined = undefined or complexTypeNameOrEdmType = string of complextype and edmTypeOrUndefined = EdmTypeShared.
 * @param complexTypeNameOrEdmType - Either the name of the complex type or the EdmType
 * @param edmTypeOrUndefined - Either the EdmType or undefined.
 * @returns The EdmType resolved for the two arguments.
 */
export function getEdmType<T extends ODataVersion>(
  complexTypeNameOrEdmType: string | EdmTypeShared<T>,
  edmTypeOrUndefined?: EdmTypeShared<T>
): EdmTypeShared<T> {
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
    `Failed to get edm type based on '${complexTypeNameOrEdmType}' and '${edmTypeOrUndefined}'.`
  );
}
