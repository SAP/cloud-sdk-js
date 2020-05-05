/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-classes-per-file */

import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { ODataV4 } from '../odata-v4';
import {
  ComplexTypeField,
  ConstructorOrField,
  getEdmType,
  getEntityConstructor
} from './complex-type-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';
import { ODataV2 } from '../odata-v2';

/**
 * Represents a property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
class CollectionFieldBase<EntityT extends Entity<ODataV4>> extends EdmTypeField<
  EntityT,
  string,
  ODataV4
> {}

/**
 * Represents a selectable property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class CollectionField<EntityT extends Entity<ODataV4>>
  extends CollectionFieldBase<EntityT>
  implements SelectableEdmTypeField {
  readonly selectable: true;
}

/**
 * Represents a complex type property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeCollectionFieldPropertyField<
  EntityT extends Entity
> extends CollectionFieldBase<EntityT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT,ODataV4>;

  /**
   * Creates an instance of ComplexTypeBigNumberPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param fieldOf - The constructor of the entity or the complex type this field belongs to
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT,ODataV4>,
    edmType: EdmType
  );

  /**
   * @deprecated since verision 1.19.0
   *
   * Creates an instance of ComplexTypeBigNumberPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param entityConstructor - Constructor type of the entity the field belongs to
   * @param parentTypeName - Name of the parent complex type
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT,{},ODataV4>,
    parentTypeName: string,
    edmType: EdmType
  );

  /*
   * Union of the two possible constructors.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT,ODataV4>,
    arg3: string | EdmType,
    arg4?: EdmType
  ) {
    super(fieldName, getEntityConstructor(fieldOf), getEdmType(arg3, arg4));
    this.fieldOf = fieldOf;
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this.fieldOf instanceof ComplexTypeField
      ? `${this.fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}
